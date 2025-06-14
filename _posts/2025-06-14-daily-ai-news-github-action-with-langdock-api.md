---
layout: post
title: "Daily AI News GitHub Action With Langdock API"
---

Ich wollte etwas Prodktives mit der Langdock API in einem GitHub Action Workflow machen. Und ich interessiere mich für Neuigkeiten rund um KI. Also hab ich dies einfach verbunden und KI generierte Artikel für meinen Blog erstellen zu lassen.

<!--more-->

Ich hab erst angefangen einen Assistenten in Langdock zu erstellen, der für einen bestimmten Zeitraum, z.B. Heute und einem Thema die aktuellen News zusammensucht. Dieser war in einer GitHub Action eingebunden, der die Ausgabe dann direkt als neuen Artikel veröffentlicht hat. Das Prompt des Assistenten habe ich mir ebenfalls von der KI generieren lassen, war sehr umfangreich und vielversprechend.

Die daraus entstandenen News Artikel waren aber dennoch relativ schlecht. Zum Einen waren die Themen nicht nur von Heute, haben sich also über mehrere Tage wiederholt, und der gemischte Artikel über mehrere Themen war nicht sehr ausführlich für die einzelnen Themen.

Also habe ich den Workflow wie folgt geändert:
* Es werden alle Titel der bereits existierenden Posts und Drafts eingelesen
* Es wird ein Request an die Langdock API geschickt, der nur die Titel der Top 3 heutigen wichtigen Neuigkeiten zurückgibt und dabei alle existierenden Titel ignoriert
* Für jeden dieser Titel wird dann wieder ein eigener Request geschickt um einen umfassenden News Artikel zu schreiben und die Quellenangaben am Ende hinzuzufügen
* Statt diese direkt als Posts zu veröffentlichen, werden sie aber als Drafts gespeichert
* Das Reviewen, Bereinigen und Veröffentlichen (durch das verschieben vom _drafts ins _posts Verzeichnis) wird dann von Hand gemacht

Dabei gab es auch einige neue Herausforderungen:
* Da ich die Web Suche benötige für aktuelle News funktioniert die Chat API nicht und es muss ein temporärer Assistent verwendet werden
* Da die Ausgabe immer KI generierter Text ist, ist es nicht möglich wirklich strukturierte Daten (wie ein valides JSON Objekt) zurückzubekommen. Man kann dem Prompt zwar mitgeben "gib mir ein valides JSON Objekt zurück", aber die KI hat in der Ausgabe dann dennoch Einleitungstext oder Backtick Blocks hinzugefügt
* Dadurch musste die Ausgabe also umfangreicher geparst werden, also habe ich kein JSON zurückgeben lassen, sondern eine Liste der Titel, jeder Titel startet dabei mit "- "
* Das Verhalten ist ebenfalls bei den Artikeln wiederzufinden, wo die KI einleitende oder abschließende Worte hinzufügt, die manuell entfernt werden müssen

Vor die fehlende Möglichkeit strukturierte JSON Objekte zurückgeben zu lassen ist schade für eine API. Dennoch ist der Workflow und die daraus resultierende Artikel nun deutlich sinnvoller und der manuelle Schritt des Reviews und der Veröffentlichung fügt dem ganzen noch ein Quality Gate hinzu.
