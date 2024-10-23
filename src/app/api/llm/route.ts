//src/app/api/llm/route.ts
import { NextResponse } from 'next/server';
import { Anthropic } from '@anthropic-ai/sdk';
import { jsonrepair } from 'jsonrepair';
import fs from 'fs/promises';
import path from 'path';

export async function POST(req: Request) {
  try {
    console.log("API: Received request");
    const body = await req.json();
    
    if (!body.data || !Array.isArray(body.data)) {
      return NextResponse.json({ error: 'Invalid data format' }, { status: 400 });
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      throw new Error('Missing ANTHROPIC_API_KEY environment variable');
    }

    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    

    const scorePrompt = body.data.join(' '); // Assuming you want to join the array into a single string
    const scoreResponse = await anthropic.messages.create({
      model: 'claude-3-sonnet-20240229',
      max_tokens: 4096,
      messages: [{ role: 'user', content: scorePrompt }],
      system: "Always respond with valid JSON without any markdown formatting.",
    });

    let response = extractTextFromContent(scoreResponse.content);
    console.log("API LLM Response: ", response);

    // Remove potential markdown code block formatting
    response = response.replace(/```json\n?|\n?```/g, '').trim();

    // Attempt to repair and parse the JSON
    let scores;
    try {
      scores = JSON.parse(jsonrepair(response));
    } catch (error) {
      return NextResponse.json({ error: 'Failed to parse scores' }, { status: 500 });
    }

    return NextResponse.json({ scores }, { status: 200 });

  } catch (error: any) {
    console.error("API Error: ", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

function extractTextFromContent(content: any[]): string {
  for (const block of content) {
    if ('text' in block) {
      return block.text;
    }
  }
  throw new Error('No text content found in response');
}
