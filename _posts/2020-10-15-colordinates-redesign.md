---
title: Colordinates Redesign
description: With Colordinates app recently turning five, I decided to give the app a new look, built on top of Vue JS code
date: 2020-10-15
tags: [vue, CodePen, colordinates, app, js, design, redesign, sideproject]
---

With [Colordinates fifth birthday](/blog/colordinates-turns-five/), I decided it was time to take another look at the app with fresh eyes and see how I would design and code it today.

![Colordinates Redesign](/assets/images/colordinates-redesign.jpg)

## New Hue

This time the whole app looks like a colour swatch. You press the button, it returns a colour! The [original Colordinates](/blog/colordinates/) design was a collection of elements in the centre of the screen. I have stripped all the elements away and let the colour swatch be the star.

I tried to keep the markup and styles close to the original but with the drastic redesign, this slipped. The app layout is structured with the DOM in a logical order, using CSS grid to position elements to the corners. I use the `system` font to give as close to a native app look as possible. App information is in a modal to keep the UI as minimal as possible.

I wanted to maintain [Colordinates accessibility](/blog/colordinates-app-a11y/), which I detailed in a previous post. App controls and modal have appropriate ARIA properties, user feedback announces via a live region in the center of the screen as before. The swatch text output (lower right) is now a purely visual change with the colour output announced for screen readers via the live region.

## Vue Hue

The app is effectively a button and an output, however, once you factor permissions, geolocation and feedback, there are several states to manage. This was a great excuse to use Vue JS. The result is a bolder, better structured app.

Launch [Colordinates app](https://codepen.io/plfstr/full/oNgxGwa) on CodePen and see what hue are you?