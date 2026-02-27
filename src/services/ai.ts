import { GoogleGenAI } from "@google/genai";

export const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateResumeContent(prompt: string, currentContent?: string) {
  try {
    const model = "gemini-2.5-flash-latest";
    const systemInstruction = `You are a professional resume writer. Your goal is to help users write compelling, professional, and ATS-friendly resume content.
    - Focus on achievements and quantifiable results.
    - Use strong action verbs.
    - Keep it concise and clear.
    - If the user provides existing content, improve it.
    - If the user provides a prompt, generate new content based on it.`;

    const response = await ai.models.generateContent({
      model,
      contents: [
        {
          role: "user",
          parts: [
            { text: `Task: ${prompt}` },
            ...(currentContent ? [{ text: `Current Content: ${currentContent}` }] : [])
          ]
        }
      ],
      config: {
        systemInstruction,
      }
    });

    return response.text;
  } catch (error) {
    console.error("Error generating content:", error);
    throw error;
  }
}
