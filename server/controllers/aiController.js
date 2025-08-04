import { GoogleGenAI } from "@google/genai";
import { db } from "../db/connect.js";
import { clerkClient } from "@clerk/express";
import { Tables } from "../db/schema.ts";

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({});

export const generateArticle = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { topic, length } = req.body;
    const plan = req.plan;
    const free_usage = req.free_usage;
    // Check if user has enough free usage
    if (plan !== "agent_investor" && free_usage >= 10) {
      return res.status(403).json({
        message: "Insufficient free usage. Please upgrade your plan.",
      });
    }
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Write a detailed article on the topic: ${topic}. The article should be approximately ${length} words long.`,
      config: {
        thinkingConfig: {
          thinkingLevel: "low",
        },
      },
    });
    const answer = response.text;
    // Store the generated article in the database
    const result = await db
      .insert(Tables)
      .values({
        user_id: userId,
        prompt: topic,
        content: answer,
        type: "article",
      })
      .returning();
    // If user is on free plan, increment their free usage count
    if (plan !== "agent_investor") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: { free_usage: free_usage + 1 },
      });
    }

    res.status(200).json({ article: answer, id: result[0].id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
