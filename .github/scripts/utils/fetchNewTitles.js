import { langdock } from './langdock.js';
import { fetchNewTitles as fetchNewTitlesPromptTemplate } from '../../config/prompt-templates/fetchNewTitles.js';

export async function fetchNewTitles(date, existingTitles) {
    const debugFilePath = `.github/debug/${date}/${date}.json`;
    const data = await langdock(debugFilePath, fetchNewTitlesPromptTemplate, { existingTitles, topic: process.env.TOPIC });
    const content = data.result[data.result.length - 1].content;
    return content
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.startsWith('- '))
        .map(line => line.substring(2).trim())
        .filter(line => line.length > 0);
}
