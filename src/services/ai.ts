import { ResumeData, initialResumeData } from "@/types";

const FIREWORKS_API_KEY = import.meta.env.VITE_FIREWORKS_API_KEY;

export async function generateResumeContent(prompt: string, currentContent?: string) {
  try {
    const systemInstruction = `You are a professional resume writer. Your goal is to help users write compelling, professional, and ATS-friendly resume content.
    - Focus on achievements and quantifiable results.
    - Use strong action verbs.
    - Keep it concise and clear.
    - If the user provides existing content, improve it.
    - If the user provides a prompt, generate new content based on it.`;

    const response = await fetch("https://api.fireworks.ai/inference/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${FIREWORKS_API_KEY}`
      },
      body: JSON.stringify({
        model: "accounts/fireworks/models/llama-v3p3-70b-instruct",
        messages: [
          { role: "system", content: systemInstruction },
          { role: "user", content: `Task: ${prompt}\n${currentContent ? `Current Content: ${currentContent}` : ''}` }
        ]
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Fireworks API Error: ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error generating content:", error);
    throw error;
  }
}

export async function generateFullResumeFromPrompt(prompt: string): Promise<ResumeData> {
  try {
    const systemInstruction = `You are an expert resume builder AI. You turn unstructured user text describing their career, skills, and education into a highly structured JSON object representing a professional, ATS-friendly resume.
    
    You MUST output valid, parsable JSON matching this interface completely. DO NOT output markdown blocks (\`\`\`json etc.). Just the raw JSON object.

    Interface:
    {
      personalInfo: {
        fullName: string;
        email: string; // generate realistic mock if not provided
        phone: string; // generate realistic mock if not provided
        address: string; // generate realistic mock if not provided
        linkedin: string; // generate realistic mock if not provided
        website: string; // generate realistic mock if not provided
        jobTitle: string; // extracted or inferred
        imageUrl?: string;
      };
      summary: string; // A highly professional, compelling 2-3 sentence summary
      experience: {
        id: string; // generate random uuid-like string
        company: string;
        position: string;
        startDate: string; // e.g. "Jan 2020" or "2020"
        endDate: string; // e.g. "Present" or "Dec 2022"
        description: string; // Write powerful, ATS-optimized bullet points. Use newline characters (\\n) to separate bullets. Ensure you write at least 3 bullet points per role, focusing on achievements and metrics.
      }[];
      education: {
        id: string;
        school: string;
        degree: string;
        startDate: string;
        endDate: string;
        description: string;
      }[];
      skills: string[]; // List of 5-10 relevant professional skills
      languages: string[];
      references?: {
        id: string;
        name: string;
        position: string;
        company: string;
        phone: string;
        email: string;
      }[];
      fontFamily?: string;
    }
    
    If the user text is brief or missing details, INFER and GENERATE high-quality, realistic, and highly impressive filler content that aligns with their stated title or industry to create a complete-looking resume.`;

    const response = await fetch("https://api.fireworks.ai/inference/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${FIREWORKS_API_KEY}`
      },
      body: JSON.stringify({
        model: "accounts/fireworks/models/llama-v3p3-70b-instruct",
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: systemInstruction },
          { role: "user", content: prompt }
        ]
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Fireworks API Error: ${errorData.error?.message || response.statusText}`);
    }

    const jsonResponse = await response.json();
    const text = jsonResponse.choices[0].message.content;

    if (!text) throw new Error("No text returned from AI");

    const data = JSON.parse(text);
    return { ...initialResumeData, ...data, fontFamily: 'Inter' };
  } catch (error) {
    console.error("Error parsing resume from prompt:", error);
    throw error;
  }
}
