import fs from 'fs';
import path from 'path';
import axios from 'axios';

export async function langdock(date, prompt, slugifiedTitle) {
    const filePath = path.join('.github/debug', `${date}${slugifiedTitle ? `-${slugifiedTitle}` : ''}.json`);

    if (fs.existsSync(filePath)) {
        return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }

    const response = await axios.post(
        'https://api.langdock.com/openai/eu/v1/chat/completions',
        {
            model: 'gpt-4o',
            messages: [
                {
                    role: 'user',
                    content: prompt,
                },
            ],
        },
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.LANGDOCK_API_KEY}`,
            },
        },
    );

    fs.writeFileSync(filePath, JSON.stringify(response.data, null, 2), 'utf8');

    return '';
}
