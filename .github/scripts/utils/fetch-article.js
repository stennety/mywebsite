import { langdock } from './langdock.js';

export async function fetchArticle(date, readableTitle, slugifiedTitle) {
    const prompt = `
        Schreibe mir einen News Artikel mit dem Titel "${readableTitle}". 
        Der Artikel soll etwa 1 Seite lang sein und mit Markdown formatiert sein. Der Titel soll nicht im Artikel enthalten sein, der Artikel soll direkt mit dem ersten Absatz beginnen. Füge ein <!--more--> zwischen dem ersten und zweiten Absatz ein.
        Verwende dabei nur Informationen der letzten 7 Tage, sodass der Artikel nur die aktuellen Neuigkeiten zu dem Thema enthält.
        Füge am Ende des Artikels einen Absatz mit den verlinkten Quellen hinzu.
    `;
    const response = await langdock(date, prompt, slugifiedTitle);
    return response.result[response.result.length - 1].content;
}
