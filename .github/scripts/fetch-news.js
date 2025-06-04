#!/usr/bin/env node
import axios from 'axios';
import fs from 'fs';
import path from 'path';

async function main() {
  const prompt = `Erstelle eine Nachrichtenzusammenfassung für Zeitraum: ${process.env.PERIOD}, Thema: ${process.env.TOPIC}, Ausgabeformat: ${process.env.FORMAT}, Sprache: ${process.env.LANGUAGE}. Füge nach dem ersten Absatz ein Tag '<!--more-->' ein.`;
  console.log('Prompt:', prompt);

  let result = null;
  if (fs.existsSync('debug.json')) {
    result = JSON.parse(fs.readFileSync('debug.json', 'utf8')).result;
  } else {
    // Fetch news from Langdock API
    console.log('Fetching news from Langdock API...');
    const response = await axios.post(
      'https://api.langdock.com/assistant/v1/chat/completions',
      {
        assistantId: process.env.ASSISTANT_ID,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.LANGDOCK_API_KEY}`
        }
      }
    );
    console.log('API RESPONSE:', JSON.stringify(response.data, null, 2));
    // fs.writeFileSync('debug.json', JSON.stringify(response.data, null, 2), 'utf8');
    result = response.data.result;
  }

  // Extract content from API response
  console.log('Result:', result);
  const assistantMsg = result.filter(r => r.role === 'assistant').pop();
  console.log('Assistant message:', assistantMsg);
  const assistantContent = assistantMsg ? assistantMsg.content : null;
  if (!assistantContent) {
    throw new Error('No content found in API response');
  }
  console.log('Assistant content:', assistantContent);

  // Define date as today in YYYY-MM-DD
  const now = new Date();
  const pad = n => n.toString().padStart(2, '0');

  // Create filename
  const date = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
  const filename = `${date}-ki-news.md`;
  const postPath = path.join('_posts', filename);

  // Write markdown file with frontmatter
  const fileContent = `---
layout: post
title: KI News from ${pad(now.getDate())}.${pad(now.getMonth() + 1)}.${now.getFullYear()}
tag: AI
---
(This is an AI generated news post.)

${assistantContent}
`;

  fs.writeFileSync(postPath, fileContent, 'utf8');
  console.log(`Created post: ${postPath}`);
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
}); 