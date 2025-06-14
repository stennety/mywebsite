export async function writeDraftFile(date, readableTitle, slugifiedTitle, content) {
    const fileContent = `---
layout: post
title: ${readableTitle}
tag: ${process.env.TOPIC}
---
*This article is completely AI generated.*

${content}
`;
    fs.writeFileSync(path.join('_drafts', `${date}-${slugifiedTitle}.md`), fileContent, 'utf8');
}
