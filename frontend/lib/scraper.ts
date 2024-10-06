import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';

const scraperAPIKey = 'a8c0494f97966a697eae597bd17e6a90';
const urlsToScrape = [
  'https://www.smu.edu/studentaffairs/drbobsmithhealthcenter/counseling-services/mentalhealthapps/smu-teletherapy',
  'https://www.smu.edu/studentaffairs/drbobsmithhealthcenter',
  'https://www.smu.edu/studentaffairs/drbobsmithhealthcenter/counseling-services',
  'https://www.pointandclicksolutions.com/',
  'https://www.smu.edu/studentaffairs/drbobsmithhealthcenter/medical-services',
  'https://www.smu.edu/studentaffairs/campusrecreation/programs/fitness',

  // Add more URLs as needed
];

// Path to store the JSON file
const filePath = path.join('lib', 'scrapedData.json');

async function scrapeAndStore() {
  const scrapedData: { url: string; scrapedData: string; timestamp: string }[] = [];

  for (const url of urlsToScrape) {
    const apiUrl = `https://api.scraperapi.com/?api_key=${scraperAPIKey}&url=${encodeURIComponent(url)}`;
    
    try {
      const response = await fetch(apiUrl);
      const data = await response.text();  // Assuming the response is HTML or JSON

      // Save the scraped data to the array
      scrapedData.push({
        url: url,
        scrapedData: data,
        timestamp: new Date().toISOString(),
      });

      console.log(`Data from ${url} has been scraped and added to the array.`);

    } catch (error) {
      console.error(`Error scraping ${url}:`, error);
    }
  }

  // Write the scraped data to a JSON file
  fs.writeFileSync(filePath, JSON.stringify(scrapedData, null, 2));
  console.log('Scraped data has been saved to scrapedData.json.');
}

scrapeAndStore();
