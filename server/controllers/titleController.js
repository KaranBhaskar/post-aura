import { db } from "../db/connect.js";
import { Tables } from "../db/schema.ts";
import { GoogleGenAI } from "@google/genai";
import { clerkClient } from "@clerk/express";

export const generateTitle = async (req, res) => {
  try {
    const { topic, category } = req.body;
    const { userId } = req.auth();
    const plan = req.plan;
    const free_usage = req.free_usage;

    const ai = new GoogleGenAI({});

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate a catchy and relevant title for an article on the topic: ${topic} in the category: ${category}, and only give one title as output. return in markdown with heading 1`,
      config: {
        thinkingConfig: {
          thinkingLevel: "low",
        },
      },
    });

    const title = response.text;

    // Store the generated title in the database
    const result = await db
      .insert(Tables)
      .values({
        user_id: userId,
        prompt: topic,
        content: title,
        type: "title-generation",
      })
      .returning();

    if (plan !== "agent_investor") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: { free_usage: free_usage + 1 },
      });
    }

    res.status(200).json({ title: title, message: "success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
