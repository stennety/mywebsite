import axios from 'axios';

export async function fetchNewTitles(ignoreTitles = []) {
    const prompt = `
        Gib mir eine Übersicht über alle aktuellen Neuigkeiten zum Thema "${process.env.TOPIC}".

        Beachte dabei aber nur Neuigkeiten der letzten 7 Tage und nur die 3 wichtigsten Neuigkeiten.

        Formatiere die Ausgabe als JSON Array und gib auch nur das JSON zurück. Jedes Element im JSON Array soll dabei folgendes Format haben:
        { "date": "YYYY-MM-DD", "readableTitle": "Ein lesbarer Titel", "slugifiedTitle": "ein-slugified-titel" }

        Ignoriere aber dabei folgende bereits bekannte Neuigkeiten: ${ignoreTitles.join(', ')}
    `;

    const response = await langdock(prompt);

    console.log(JSON.stringify(response, null, 2));
    
    return [];
}
