import fs from 'fs';

export async function writeDraftFile(date, sanatizedTitle, slugifiedTitle, sanitizedContent) {
    const draftFile = `_drafts/${date}-${slugifiedTitle}.md`;
    const draftContent = `---
language: "de"
layout: "post"
title: "${sanatizedTitle.replace(/"/g, '\\"')}"
tag: "${process.env.TOPIC}"
ai_generated: true
---

${sanitizedContent}
`;
    await fs.writeFileSync(draftFile, draftContent);
}
