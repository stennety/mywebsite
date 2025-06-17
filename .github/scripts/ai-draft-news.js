#!/usr/bin/env node

import fs from 'fs';
import { fetchContent } from './utils/fetchContent.js';
import { fetchNewTitles } from './utils/fetchNewTitles.js';
import { getExistingTitles } from './utils/getExistingTitles.js';
import { sanitizeAIText } from './utils/sanatizeAIText.js';
import { slugify } from './utils/slugify.js';
import { today } from './utils/today.js';
import { writeDraftFile } from './utils/writeDraftFile.js';
import { writeSanatizedTitlesFile } from './utils/writeSanatizedTitlesFile.js';

async function main() {
    const date = today();

    const debugDir = `.github/debug/${date}`;
    if (!fs.existsSync(debugDir)) {
        fs.mkdirSync(debugDir, { recursive: true });
    }

    const existingTitles = await getExistingTitles();
    console.log('existingTitles', existingTitles);
    
    const sanatizedTitles = (await fetchNewTitles(date, existingTitles)).map(sanitizeAIText);
    console.log('sanatizedTitles', sanatizedTitles);

    await writeSanatizedTitlesFile(date, sanatizedTitles);

    for (const sanatizedTitle of sanatizedTitles) {

        const slugifiedTitle = slugify(sanatizedTitle);
        console.log('slugifiedTitle', slugifiedTitle);

        const content = await fetchContent(date, sanatizedTitle, slugifiedTitle);
        const sanitizedContent = sanitizeAIText(content);
        console.log('sanitizedContent', sanitizedContent);

        await writeDraftFile(date, sanatizedTitle, slugifiedTitle, sanitizedContent);
    }
}
  
main().catch(err => {
    console.error('Error:', err.message);
    process.exit(1);
});
