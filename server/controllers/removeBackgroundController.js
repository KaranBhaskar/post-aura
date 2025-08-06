import { db } from "../db/connect.js";
import { clerkClient } from "@clerk/express";
import { Tables } from "../db/schema.ts";
import { GoogleGenAI } from "@google/genai";
import { uploadBufferImage } from "../utils/uploadImage.js";

export const removeBackground = async (req, res) => {
  try {
    const { userId } = req.auth();
    const image = req.file.buffer;
    const plan = req.plan;
    if (plan !== "agent_investor") {
      return res.status(403).json({
        message:
          "Background removal is only available for Agent Investor plan users.",
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
    res.status(200).json({ image: uploadResult.url });
  } catch (error) {
    console.error("Error removing background:", error);
    res
      .status(500)
      .json({ message: "Internal server error @ removeBackground" });
  }
};
