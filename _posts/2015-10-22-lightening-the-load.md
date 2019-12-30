---
title: Lightening the Load
description: When taking away, adds better experience. Recent performance tweaks to lighten page weight and increase speed of paulfosterdesign.co.uk
date: 2015-10-22
source: 
tags: [personal, perf, web, js]
---
So my sites been through a mild overhaul recently behind the scenes. Hopefully you experienced it in an even briefer gap while the page loaded.

Speed was a goal from the start of the site in its current guise, flat design lends itself well to faster loading. I launched with a minimum viable site and have refined from there, but there were just a few  areas I needed to finally finesse. 

My recent page weight reduction began with revisiting my contact form and looking at lightweight plain-JS solutions to form validation. I realised the support for HTML5 validation is at a level where I could remove JS polyfills entirely and rely on browser validation. I wondered what other areas I could re-examine and make some further savings.

## Whats changed?

So in my latest critical pass of my site, what savings was I able to make to speed the page load? 

*	The homepage has reduced from 8 project images to 6. This leaves visitors with something to discover and presents my finest projects faster thanks to 2 fewer image requests, especially helpful for mobile users. As a bonus, it also enabled me to now use the same PHP include menu across my site templates, making changes as simple as one tweak. 
*	JS has been more than halved. Thanks to browser support for viewport units, a plain-JS fork of FitText.js used to make the logo text fill 100% width, has been removed. I also made my mobile menu much more modular and lighter than previously.
*	Contact form is now jQuery free, saving users from having to download jQuery (so long jQuery!) and a validation plugin and which saves 100Kb+ and two requests. A key page where increases in performance could be the difference between someone taking the time to contact me or not.
*	Addition of `dns-prefetch` to alert the browser to the few third-party scripts my site uses for analytics, CodePen.

In this case it was mainly legacy code, the progress in browser support has made the reductions possible. However, it never hurts to revisit old code with some more knowledge and a fresh pair of eyes.

## Code != Effort

It seems ridiculous, but I feel kind of self conscious of the fact that my code looks sparse and my page is not heaving with the latest frameworks and my JS looks simple. People equate presence of code with work done, rather than the effort taken to reduce it back to the essential, to keep revisiting and reimplementing. Less is more, but often a little more work.