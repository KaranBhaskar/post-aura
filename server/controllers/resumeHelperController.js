import { db } from "../db/connect.js";
import { Tables } from "../db/schema.js";
import { GoogleGenAI } from "@google/genai";
import { clerkClient } from "@clerk/express";
import "dotenv/config";

export const resumeHelper = async (req, res) => {
  try {
    const { userId } = req.auth();
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
    const { resumeAdvice } = req.body;
    const { buffer, mimetype } = req.file;
    const ai = new GoogleGenAI({});

    const prompt = [
      {
        text:
          `Provide detailed feedback and improvement suggestions for the following resume. Focus on structure, content, and overall presentation. Do not make any changes to the formatting or layout.` +
          ` With emphasis on ${resumeAdvice} in Markdown format.`,
      },
      {
        inlineData: {
          mimeType: mimetype,
          data: buffer.toString("base64"),
        },
      },
    ];
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        thinkingConfig: {
          thinkingLevel: "low",
        },
      },
    });
    const feedback = response.text;

    // Store the generated feedback in the database
    const result = await db
      .insert(Tables)
      .values({
        user_id: userId,
        prompt: `Resume advice: ${resumeAdvice}`,
        content: feedback,
        type: "resume-assistance",
      })
      .returning();

    if (plan !== "angel_investor") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: { free_usage: free_usage + 1 },
      });
    }

    res.status(200).json({ feedback: feedback });
  } catch (error) {
    console.error("Error in resumeHelper:", error);
    res.status(500).json({ message: "Internal server error @ resumeHelper" });
  }
};
