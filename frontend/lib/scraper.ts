import axios from 'axios';
import cheerio from 'cheerio';

// Function to scrape a URL using ScraperAPI
export async function scrapeWithScraperAPI(url: string) {
  const API_KEY = 'a8c0494f97966a697eae597bd17e6a90'; // Replace with your ScraperAPI key
  const apiUrl = `http://api.scraperapi.com?api_key=${API_KEY}&url=${url}`;

  try {
    // Fetching the page through ScraperAPI
    const { data } = await axios.get(apiUrl);
    
    // Load HTML with Cheerio
    const $ = cheerio.load(data);

    // Extracting specific content (example: paragraphs with relevant data)
    const scrapedContent: string[] = [];
    
    $('p').each((i, el) => {
      const text = $(el).text().trim();
      if (text) {
        scrapedContent.push(text);
      }
    });

    return scrapedContent; // Return extracted paragraphs

  } catch (error) {
    console.error('Error during scraping:', error);
    return null;
  }
}
