import { db } from "../db/connect.js";
import { clerkClient } from "@clerk/express";
import { Tables } from "../db/schema.ts";
import { GoogleGenAI } from "@google/genai";
import { uploadBufferImage } from "../utils/uploadImage.js";
import "dotenv/config";

export const removeBackground = async (req, res) => {
  try {
    const { userId } = req.auth();
    const image = req.file.buffer;
    const plan = req.plan;
    const free_usage = req.free_usage;
    if (
      plan !== "angel_investor" &&
      free_usage >= parseInt(process.env.FREE_USER_QUOTA)
    ) {
      return res.status(403).json({
        message:
          "You've used all the free usage quota. Please upgrade your plan.",
      });
    }

    const ai = new GoogleGenAI({});

    const prompt = [
      {
        text: "Remove the background from the following image, and do not include any other elements.",
      },
      {
        inlineData: {
          mimeType: "image/png",
          data: image.toString("base64"),
        },
      },
    ];
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-image-preview",
      contents: prompt,
    });

    let uploadResult;
    for (const part of response.candidates[0].content.parts) {
      if (part.text) {
        console.log(part.text);
      } else if (part.inlineData) {
        const imageData = part.inlineData.data;
        const buffer = Buffer.from(imageData, "base64");
        uploadResult = await uploadBufferImage(buffer, "background-removal");
      }
    }
    const result = await db
      .insert(Tables)
      .values({
        user_id: userId,
        prompt: "Background removal",
        content: uploadResult.public_id,
        type: "background-removal",
      })
      .returning();

    if (plan !== "angel_investor") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: { free_usage: free_usage + 1 },
      });
    }
    res.status(200).json({ image: uploadResult.url });
  } catch (error) {
    console.error("Error removing background:", error);
    res
      .status(500)
      .json({ message: "Internal server error @ removeBackground" });
  }
};
