import { clerkClient } from "@clerk/express";
import { db } from "../db/connect.js";
import { Tables } from "../db/schema.ts";
import { GoogleGenAI } from "@google/genai";
import { uploadBufferImage } from "../utils/uploadImage.js";

export const generateImage = async (req, res) => {
  try {
    const { prompt, style, is_public } = req.body;
    const { userId } = req.auth();
    const plan = req.plan;
    const free_usage = req.free_usage;

    if (plan !== "angel_investor" && free_usage >= 2) {
      return res.status(403).json({
        message:
          "Image generation is not allowed for your current plan. Please upgrade your plan.",
      });
    }

    const ai = new GoogleGenAI({});

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-image",
      contents: `Create an image based on the following description: ${prompt} in the style of ${style}.`,
    });

    let uploadResult;
    for (const part of response.candidates[0].content.parts) {
      if (part.text) {
        console.log(part.text);
      } else if (part.inlineData) {
        const imageData = part.inlineData.data;
        const buffer = Buffer.from(imageData, "base64");
        uploadResult = await uploadBufferImage(buffer);
      }
    }

    const result = await db
      .insert(Tables)
      .values({
        user_id: userId,
        prompt: prompt,
        content: uploadResult.public_id,
        type: "image-generation",
        public: is_public,
      })
      .returning();

    res.status(200).json({ image: uploadResult.url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error @ generateImage" });
  }
};
