---
layout: post
title: Minimal Reproducible Examples
---

Almost every best practice and trick in the book is applicable to AI-assisted coding.  The one I was reminded of the hard way is using Minimal Reproducible Examples to help understand and fix a problem.  I've noticed especially while using more 'proactive' and automated coding tools like [Cline](https://github.com/cline/cline) to write and update unit tests, test failures can lead to a long session of going in circles while the token count climbs.   

Besides the time and cost concerns, the bigger problem is that the context window rapidly starts to fill up with all these fruitless iterations.  The more that happens, the more easily confused your assistant will get.  I can usually tell something is up when they start to say things like "Aha!  I figured out the problem..."  It could be a cooincidence, but I feel like a bot growing a personality usually correlates with higher chance of hallucination.

Today I had to stop Claude a few times, start a new session, and remind them to start with a minimal reproducible example.  So far it seems like this has been a good remedy for the circular unit test 'fixing' spree we were having.  Its something that I should probably apply to my own human troubleshotting more often.  For more on how/what/why this is, I'll defer to this [existing help article](https://stackoverflow.com/help/minimal-reproducible-example) on Stack Overflow.
