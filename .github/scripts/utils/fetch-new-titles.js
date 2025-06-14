import { langdock } from './langdock.js';

export async function fetchNewTitles(date, ignoreTitles = []) {
    const prompt = `
        Gib mir eine Übersicht über alle aktuellen Neuigkeiten zum Thema "${process.env.TOPIC}".

        Beachte dabei aber nur Neuigkeiten der letzten 7 Tage und nur die 3 wichtigsten Neuigkeiten.

        Gib als Antwort ein gültiges JSON Array zurück ohne zusätzlichen Text, Erklärungen oder ${'```json ```'} Block. Jedes Element im JSON Array soll dabei folgendes Format haben:
        { "readableTitle": "Ein lesbarer Titel", "slugifiedTitle": "ein-slugified-titel" }

        Ignoriere aber dabei folgende bereits bekannte Neuigkeiten: ${ignoreTitles.join(', ')}
    `;

    const response = await langdock(date, prompt);

    console.log(JSON.stringify(response, null, 2));

    const titles = response.choices[0].message.content;
    try {
        console.log(JSON.parse(titles));
    } catch (error) {
        console.error('Error parsing JSON:', error);
        return [];
    }

    return [];
}
