import { langdock } from './langdock.js';
import { fetchContent as fetchContentPromptTemplate } from '../../../config/prompt-templates/fetchContent.js';

export async function fetchContent(date, sanitizedTitle, slugifiedTitle) {
    const debugFilePath = `.github/debug/${date}/${slugifiedTitle}.json`;
    const data = await langdock(debugFilePath, fetchContentPromptTemplate, { title: sanitizedTitle });
    return data.result[data.result.length - 1].content;
}
