import { streamText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";

export const maxDuration = 60;

const nexorian = createOpenAI({
  baseURL: process.env.NEXORIAN_INFERENCE_URL || "http://localhost:11434/v1",
  apiKey: process.env.NEXORIAN_API_KEY || "nexorian-local",
});

export async function POST(req: Request) {
  const { messages, system } = await req.json();

  const result = streamText({
    model: nexorian(process.env.NEXORIAN_MODEL || "jarvis"),
    system: system || "You are a high-integrity AI writing assistant from Nexorian. Prioritize accuracy, clarity, efficiency, and sovereignty.",
    messages,
  });

  return result.toDataStreamResponse();
}