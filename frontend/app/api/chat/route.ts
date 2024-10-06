import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Ensure your API key is valid and configured
});

export async function POST(req: NextRequest) {
  try {
    const { userMessage } = await req.json();

    // Send the message to OpenAI
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful mental health assistant.' },
        { role: 'user', content: userMessage },
      ],
      max_tokens: 150,
      temperature: 0.7,
    });

    const assistantMessage = response.choices[0].message.content;

    // Return the assistant's message
    return NextResponse.json({ assistantMessage });

  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json({ error: 'Error processing your request' }, { status: 500 });
  }
}
