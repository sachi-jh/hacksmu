import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai'; // Import the default OpenAI export

// Initialize OpenAI with the API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Make sure the API key is stored in environment variables
});

export async function POST(req: NextRequest) {
  try {
    // Parse the request body to get the user's message from the frontend
    const { userMessage } = await req.json();
    console.log("Received message from user:", userMessage);

    // Call the OpenAI API with the user's message
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // Model name
      messages: [
        {
          role: 'system',
          content: 'You are a supportive and empathetic mental health assistant. Always provide gentle advice and avoid triggering responses.',
        },
        {
          role: 'user',
          content: userMessage, // User's message from the frontend
        },
      ],
      max_tokens: 150, // Adjust tokens as per requirement
      temperature: 0.7, // Control response creativity
    });

    // Extract the chatbot's reply from the OpenAI response
    const assistantMessage = response.choices[0].message.content;

    // Return the assistant's reply back to the frontend
    return NextResponse.json({ assistantMessage });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
