import { clerkClient } from "@clerk/express";
import { db } from "../db/connect.js";
import { Tables } from "../db/schema.ts";
import { GoogleGenAI } from "@google/genai";
import * as fs from "node:fs";

export const generateImage = async (req, res) => {
  try {
    const { prompt, style, is_public } = req.body;
    const { userId } = req.auth();
    const plan = req.plan;
    const free_usage = req.free_usage;

    console.log("Hello");

    const ai = new GoogleGenAI({});

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-image",
      contents: `Create an image based on the following description: ${prompt} in the style of ${style}.`,
    });

    let buffer;
    for (const part of response.candidates[0].content.parts) {
      if (part.text) {
        console.log(part.text);
      } else if (part.inlineData) {
        const imageData = part.inlineData.data;
        buffer = Buffer.from(imageData, "base64");
        // fs.writeFileSync("photosynthesis.png", buffer);
        // console.log("Image saved as photosynthesis.png");
      }
    }

    const result = await db
      .insert(Tables)
      .values({
        user_id: userId,
        prompt: prompt,
        content: buffer,
        type: "image",
        public: is_public,
      })
      .returning();

    if (plan !== "agent_investor") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: { free_usage: free_usage + 1 },
      });
    }
    res.status(200).json({ image: buffer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error @ generateImage" });
  }
};
