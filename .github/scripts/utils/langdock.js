import fs from 'fs';
import path from 'path';
import axios from 'axios';

export async function langdock(date, prompt, slugifiedTitle) {
    const filePath = path.join('.github/debug', `${date}${slugifiedTitle ? `-${slugifiedTitle}` : ''}.json`);

    if (fs.existsSync(filePath)) {
        return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }

    const response = await axios.post(
        'https://api.langdock.com/assistant/v1/chat/completions', 
        {
            // Temporärer Assistant mit Web-Suche
            assistant: {
                name: 'News Assistant',
                instructions: '',
                temperature: 0.3,
                model: 'gpt-4o',
                capabilities: {
                    webSearch: true, // Aktiviert Web-Suche
                    dataAnalyst: false,
                    imageGeneration: false
                }
            },
            messages: [
                {
                    role: 'user',
                    content: prompt
                }
            ]
        }, 
        {
            headers: {
            'Authorization': `Bearer ${process.env.LANGDOCK_API_KEY}`,
            'Content-Type': 'application/json'
            }
        }
    );

    fs.writeFileSync(filePath, JSON.stringify(response.data, null, 2), 'utf8');

    return '';
}
