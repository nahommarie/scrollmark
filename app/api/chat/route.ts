import { NextResponse } from "next/server";

const { OpenAI } = require("openai");

export async function POST(req: Request) {
    const { content } = await req.json();

    const baseURL = "https://api.aimlapi.com/v1";

    // Insert your AIML API Key in the quotation marks instead of my_key:
    const apiKey = process.env.API_KEY;

    const systemPrompt = "You are a Director for Social Media Management with years of experience helping cliens with scheduled posts. Answer concisely and with a positive attitude, so no lists. Ideally 1-2 sentences and *maybe* an example.";
    const userPrompt = "Hi there! Can you give me feedback on my my planned social media post? \n\n" + content;

    const api = new OpenAI({
        apiKey,
        baseURL,
    });

    const completion = await api.chat.completions.create({
        model: "mistralai/Mistral-7B-Instruct-v0.2",
        messages: [
            {
                role: "system",
                content: systemPrompt,
            },
            {
                role: "user",
                content: userPrompt,
            },
        ],
        temperature: 0.7,
        max_tokens: 256,
    });

    const response = completion.choices[0].message.content;

    console.log("User:", userPrompt);
    console.log("AI:", response);

    return Response.json({ response });
}