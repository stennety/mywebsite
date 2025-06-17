import axios from 'axios';
import fs from 'fs';
import path from 'path';

export async function langdock(debugFilePath, template, templateData) {
    if (process.env.USE_DEBUG_FILE === 'true' && fs.existsSync(debugFilePath)) {
        return JSON.parse(fs.readFileSync(debugFilePath, 'utf8')).response.data;
    }
    
    let prompt = template.prompt;
    for (const key in templateData) {
        prompt = prompt.replace(`{${key}}`, templateData[key]);
    }
    console.log('prompt', prompt);

    const response = await axios.post(
        'https://api.langdock.com/assistant/v1/chat/completions', 
        {
            // Temporärer Assistant mit Web-Suche
            assistant: {
                name: 'News Assistant',
                instructions: '',
                temperature: template.temperature,
                model: template.model,
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

    const fileData = {
        request: {
            timestamp: new Date().toISOString(),
            prompt,
            model: template.model,
            temperature: template.temperature,
        },
        response: {
            data: response.data,
        },
    };

    fs.writeFileSync(debugFilePath, JSON.stringify(fileData, null, 2), 'utf8');

    return fileData.response.data;
}
