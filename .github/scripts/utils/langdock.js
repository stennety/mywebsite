import axios from 'axios';

export async function langdock(prompt, { slugifiedTitle } = {}) {
    const now = new Date();
    const id = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}${slugifiedTitle ? `-${slugifiedTitle}` : ''}`;  // Format: "YYYY-MM-DD-slugifiedTitle"

    if (fs.existsSync(path.join('.github/debug', `${id}.json`))) {
        return JSON.parse(fs.readFileSync(path.join('.github/debug', `${id}.json`), 'utf8'));
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

    fs.writeFileSync(path.join('.github/debug', `${id}.json`), JSON.stringify(response.data, null, 2), 'utf8');

    return '';
}
