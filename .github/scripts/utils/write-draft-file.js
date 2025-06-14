import fs from 'fs';
import path from 'path';

export async function writeDraftFile(date, readableTitle, slugifiedTitle, content) {
    const fileContent = `---
layout: post
title: "${readableTitle.replace(/"/g, '\\"')}"
tag: ${process.env.TOPIC}
ai_generated: true
---
*Dieser Artikel ist vollständig durch KI generiert.*

${content}
`;
    const fileName = `${date}-${slugifiedTitle}.md`;
    if (fs.existsSync(path.join('_posts', fileName))) {
        console.log(`File ${fileName} already exists in _posts`);
        return;
    } 
    fs.writeFileSync(path.join('_drafts', fileName), fileContent, 'utf8');
}
