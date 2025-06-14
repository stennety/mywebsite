#!/usr/bin/env node
import { getExistingTitles } from './utils/get-existing-titles.js';
import { fetchNewTitles } from './utils/fetch-new-titles.js';
import { fetchArticle } from './utils/fetch-article.js';
import { writeDraftFile } from './utils/write-draft-file.js';

async function main() {
  const now = new Date();
  const date = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

  const existingTitles = await getExistingTitles();
  const newTitles = await fetchNewTitles(date, existingTitles);
  for (const newTitle of newTitles) {
    const readableTitle = newTitle;
    const slugifiedTitle = readableTitle.toLowerCase().replace(/ /g, '-');
    const content = await fetchArticle(date, readableTitle, slugifiedTitle);
    await writeDraftFile(date, readableTitle, slugifiedTitle, content);
  }
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
