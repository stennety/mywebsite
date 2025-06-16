#!/usr/bin/env node
import { getExistingTitles } from './utils/get-existing-titles.js';
import { fetchNewTitles } from './utils/fetch-new-titles.js';
import { fetchArticle } from './utils/fetch-article.js';
import { writeDraftFile } from './utils/write-draft-file.js';

function sanitizeAIText(text) {
  return text
    .replace(/```markdown/, '')
    .replace(/```/, '')
    .replace(/[„“]/g, '"')
    .trim();
}

async function main() {
  const now = new Date();
  const date = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

  const existingTitles = await getExistingTitles();
  const newTitles = await fetchNewTitles(date, existingTitles);
  console.log('newTitles', newTitles);
  for (const newTitle of newTitles) {
    const readableTitle = sanitizeAIText(newTitle);
    const slugifiedTitle = readableTitle.toLowerCase().replace(/ /g, '-').replace(/[^a-z0-9-]/g, '');
    console.log('readableTitle', readableTitle);
    console.log('slugifiedTitle', slugifiedTitle);
    const content = await fetchArticle(date, readableTitle, slugifiedTitle);
    const sanitizedContent = sanitizeAIText(content);
    await writeDraftFile(date, readableTitle, slugifiedTitle, sanitizedContent);
  }
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
