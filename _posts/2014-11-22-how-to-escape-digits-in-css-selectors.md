---

published: true
title: How to escape digits in CSS selectors
---
I've been writing Selenium tests for work lately and got tripped up recently on an element that had id "\#1\_ul." Selenium kept throwing an error that the selector was invalid. I used FireFinder to generate a unique CSS selector for the element, and it returned "#\\\\31\_ ul". This puzzled me, until I came across [this post](https://mathiasbynens.be/notes/css-escapes) on CSS selector escape sequences. It turns out that I needed to escape the leading digit in the selector. The way that CSS selectors work, to escape any numeric character, just prefix it with \3 and append a space character. This has to do with Unicode.
