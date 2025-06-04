#!/usr/bin/env node
import axios from 'axios';
import fs from 'fs';
import path from 'path';

async function main() {
  const prompt = `Create a news post with the variables Zeitraum: ${process.env.PERIOD}, Thema: ${process.env.TOPIC}, Sprache: ${process.env.LANGUAGE}. Add <!--more--> between the first and second paragraph. The output format should be markdown, but without the backticks around the content.`;
  console.log('Prompt:', prompt);

  // Define date as today in YYYY-MM-DD
  const now = new Date();
  const pad = n => n.toString().padStart(2, '0');
  const date = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;

  const debugFilePath = `.github/debug/${date}-ki-news.json`;

  let result = null;
  if (fs.existsSync(debugFilePath)) {
    result = JSON.parse(fs.readFileSync(debugFilePath, 'utf8')).result;
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
    const responseContent = JSON.stringify(response.data, null, 2);
    console.log('API RESPONSE:', responseContent);

    // Write response to debug file
    fs.writeFileSync(debugFilePath, responseContent, 'utf8');

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

  // Extract the title from the assistant content
  let title = assistantContent.split('\n')[0].replace('# ', '');
  if (!title) {
    title = `AI News from ${pad(now.getDate())}.${pad(now.getMonth() + 1)}.${now.getFullYear()}`;
  }
  console.log('Title:', title);

  // Extract the content from the assistant content
  const content = assistantContent.split('\n').slice(1).join('\n').trim();
  console.log('Content:', content);

  // Create filename
  const filename = `${date}-ki-news.md`;
  const postPath = path.join('_posts', filename);

  // Write markdown file with frontmatter
  const fileContent = `---
layout: post
title: ${title}
tag: AI
---
(This is an AI generated news post.)

${content}
`;

  fs.writeFileSync(postPath, fileContent, 'utf8');
  console.log(`Created post: ${postPath}`);
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
}); 