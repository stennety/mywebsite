import { langdock } from './langdock.js';

export async function fetchNewTitles(date, ignoreTitles = []) {
    const prompt = `
        Gib mir eine Übersicht über alle aktuellen Neuigkeiten zum Thema "${process.env.TOPIC}".

        Beachte dabei aber nur Neuigkeiten der letzten 7 Tage und nur die 3 wichtigsten Neuigkeiten.

        Formatiere die Antwort EXAKT in diesem Markdown-Format:
        - Titel 1
        - Titel 2
        - Titel 3

        Wichtig:
        - Jede Zeile beginnt mit "- " (Bindestrich + Leerzeichen)
        - Ein Titel pro Zeile

        Ignoriere aber dabei folgende bereits bekannte Neuigkeiten: ${ignoreTitles.join(', ')}
    `;
    const response = await langdock(date, prompt);
    const content = response.result[response.result.length - 1].content;
    return content
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.startsWith('- '))
        .map(line => line.substring(2).replace(/【.*】/, '').trim())
        .filter(line => line.length > 0);
}
