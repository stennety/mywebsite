import axios from 'axios';

export async function fetchArticle({ readableTitle, slugifiedTitle }) {
    const prompt = `
        Schreibe mir einen News Artikel mit dem Titel "${readableTitle}". 
        Der Artikel soll etwa 1 Seite lang sein und mit Markdown formatiert sein. Der Titel soll nicht im Artikel enthalten sein, der Artikel soll direkt mit dem ersten Absatz beginnen. Füge ein <!--more--> zwischen dem ersten und zweiten Absatz ein.
        Verwende dabei nur Informationen der letzten 7 Tage, sodass der Artikel nur die aktuellen Neuigkeiten zu dem Thema enthält.
    `;

    const response = await langdock(prompt, { slugifiedTitle });

    console.log(JSON.stringify(response, null, 2));

    return '';
}
