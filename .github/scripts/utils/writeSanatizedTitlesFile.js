import fs from 'fs';

export async function writeSanatizedTitlesFile(date, sanatizedTitles) {
    const filePath = `.github/debug/${date}/sanatizedTitles.md`;
    fs.writeFileSync(filePath, sanatizedTitles.map(title => `- ${title}\n`).join(''));
}
