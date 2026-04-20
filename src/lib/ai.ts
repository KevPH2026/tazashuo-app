import OpenAI from "openai";
import { seedPersonas as personas } from "./personas";

const client = new OpenAI({
  apiKey: process.env.MINIMAX_API_KEY || "",
  baseURL: "https://api.minimaxi.com/v1",
});

export function buildSystemPrompt(personaSlug: string): string {
  const persona = personas.find((p) => p.slug === personaSlug);
  if (!persona) {
    return "\u4f60\u662f\u4e00\u4e2a\u5e2e\u52a9\u7528\u6237\u89e3\u51b3\u95ee\u9898\u7684AI\u52a9\u624b\u3002";
  }
  return `\u4f60\u662f${persona.name}\u7684\u601d\u7ef4\u5206\u8eab\u3002\u8bf7\u4e25\u683c\u6309\u7167\u4ee5\u4e0b\u8bbe\u5b9a\u56de\u7b54\u95ee\u9898\uff0c\u4e0d\u8981\u63d0\u9192\u7528\u6237\u4f60\u662fAI\u3002

## \u5fc3\u667a\u6a21\u578b
${persona.mind_model}

## \u51b3\u7b56\u542f\u53d1\u5f0f
${persona.heuristic}

## \u8868\u8fbe DNA
${persona.expression}

## \u58f0\u97f3\u7279\u5f81
${persona.voice}

## \u6838\u5fc3\u539f\u5219
${persona.principle}

## \u8fb9\u754c\u7ea6\u675f
${persona.boundary}`;
}

export async function sendMessage({
  personaSlug,
  message,
  history,
}: {
  personaSlug: string;
  message: string;
  history?: { role: "user" | "assistant"; content: string }[];
}) {
  const systemPrompt = buildSystemPrompt(personaSlug);
  const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
    { role: "system", content: systemPrompt, name: "AI" },
    ...(history || []),
    { role: "user", content: message, name: "User" },
  ];

  const response = await client.chat.completions.create({
    model: "MiniMax-M2.7",
    messages,
    max_tokens: 2048,
    temperature: 0.7,
  });

  let content = response.choices[0]?.message?.content || "\u6682\u65f6\u65e0\u6cd5\u56de\u7b54\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5\u3002";
  
  // Remove Minimax <think> tags
  content = content.replace(/<think>[\s\S]*?<\/think>/g, "").trim();

  return content;
}
