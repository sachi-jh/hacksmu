import { NextRequest, NextResponse } from 'next/server';
import { scrapeWithScraperAPI } from '../../../lib/scraper';  // Import scraper function
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Ensure your API key is valid and configured
});

const keywordResponseMap = {
    "support groups": {
      response: "you can find support groups on our website under the 'Support Groups' tab!",
      url: "https://api.scraperapi.com/?api_key=YOUR_API_KEY&url=YOUR_SUPPORT_GROUPS_URL"
    },
    "resources": {
      response: "Here are some resources you might find helpful:",
      url: "https://api.scraperapi.com/?api_key=YOUR_API_KEY&url=YOUR_RESOURCES_URL"
    },
    "appointment": {
      response: "To schedule an appointment, please follow these steps:",
      url: "https://api.scraperapi.com/?api_key=YOUR_API_KEY&url=YOUR_APPOINTMENT_URL"
    }
  };

export async function POST(req: NextRequest) {
  try {
    const { userMessage } = await req.json();
    
    // Send the message to OpenAI
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',//'asst_xAU2TLRxofrBEtejqNwlYl1d',//
      messages: [
        { role: 'system', content: 'You are a helpful health assistant. If you are asked a question'
            + 'about support groups, direct the user to the "Support Groups" tab on this website.'
            + ' If the user asks about booking an appointment and it is in relation to mental health'
            + 'direct them to https://www.smu.edu/studentaffairs/drbobsmithhealthcenter/counseling-services/mentalhealthapps/smu-teletherapy'
            + 'and explain how that department handles appointment scheduling' },
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
