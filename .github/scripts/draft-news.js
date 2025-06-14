#!/usr/bin/env node
import { getExistingTitles } from './utils/get-existing-titles.js';
import { fetchNewTitles } from './utils/fetch-new-titles.js';
import { fetchArticle } from './utils/fetch-article.js';
import { writeDraftFile } from './utils/write-draft.js';

async function main() {
  const existingTitles = await getExistingTitles();
  const newTitles = await fetchNewTitles(existingTitles);
  for (const { date, readableTitle, slugifiedTitle } of newTitles) {
    const content = await fetchArticle(title);
    await writeDraftFile({ date, readableTitle, slugifiedTitle }, content);
  }
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
