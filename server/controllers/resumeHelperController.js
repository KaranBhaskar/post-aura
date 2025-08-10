import { db } from "../db/connect.js";
import { Tables } from "../db/schema.ts";
import { GoogleGenAI } from "@google/genai";

export const resumeHelper = async (req, res) => {
  try {
    const { userId } = req.auth();
    const plan = req.plan;
    if (plan !== "agent_investor") {
      return res.status(403).json({
        message: "Resume assistance is only available for Agent Investors.",
      });
    }
    const { resumeAdvice } = req.body;
    const { buffer, mimetype } = req.file;
    const ai = new GoogleGenAI({});

    const prompt = [
      {
        text:
          `Provide detailed feedback and improvement suggestions for the following resume. Focus on structure, content, and overall presentation. Do not make any changes to the formatting or layout.` +
          ` With emphasis on ${resumeAdvice} in Markdown format.` ,
      },
      {
        inlineData: {
          mimeType: mimetype,
          data: buffer.toString("base64"),
        },
      },
    ];
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: prompt,
      config: {
        thinkingConfig: {
          thinkingLevel: "mid",
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

    res.status(200).json({ feedback: feedback });
  } catch (error) {
    console.error("Error in resumeHelper:", error);
    res.status(500).json({ message: "Internal server error @ resumeHelper" });
  }
};
