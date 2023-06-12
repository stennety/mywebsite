---
title: What does quality mean to me?
date: '2021-10-22 00:00:00 +0100'
tags:
  - quality
  - testing
categories:
  - About Ben
redirect_from:
  - /what-does-quality-mean-to-me/
---

There are many definitions of Software and Product "Quality". For a long time, earlier in my career, I did much to ignore the topic and felt it was intangible. The definitions that I had at the time were all about only the Correctness, the strict conformance to well specified requirements.

Over the last 3+ years I've massively increased my external communication with the wider testing community. I've read blogs, watched presentations and I've tested a bunch more software.

Now, I'm approaching a point I've got some kind of grasp of software quality, in a way that can be usefully and concisely defined.

## What does quality mean to me?

### I posted this one Twitter:

![](/uploads/quality-tweet.PNG)

> What does quality mean to me? Goodness, Usefulness and Correctness at a point of time, with a context that takes into account ethics, customer success, business success, competitor products and the wider industry. That allows for "good enough" in that context to be enough!

### Context, at a point in time

In my experience, users and other people who matter make their judgement on the quality of your product taking into account external influences, such as current competition and competing solutions. They are also likely to be influenced based on current local, national or global situations, such as Brexit or the COVID-19 Pandemic.

And that is before you take into account the influence on their judgement from personal factors, such as fanatical independence, levels of stress, mood and any other thing you could possibly think of. These individual influences are difficult to take into account, and realistically we probably won't be able to account for them all, but instead simply accept the risks this raises in many cases.

So, the product is judged based on it's Goodness, Usefulness and Correctness alongside other external influences. As such any measurement of quality is only a snapshot of the current sentiment of the group of people who you have been able to gather at the point feedback is collected.

For example Windows XP was considered by many as a huge leap forward in quality when it was first released in 2001. But how would you feel if I gave you XP to use now?

So, the code many not change, the product is the same, but the quality may be reduced over time as context changes.

## My definition doesn't exist in isolation

In order to come to this definition, I've spoke to, read and consumed from many great Testers. Notability [Dan Ashby](https://twitter.com/DanAshby04), whom I am now lucky enough to work with, and [Stu C](https://twitter.com/StooCrock).

### Quality Panel

I also took part in a [Quality Panel](https://www.ministryoftesting.com/dojo/series/the-ministry-of-testing-podcast-2021/lessons/mot-podcast-quality-panel) discussion for the MoT Podcast, alongside [Gem Hill](https://twitter.com/Gem_Hill), Alsa Tabatabei and [Lee Marshall]().

### Quality Aspects

In the last few months, I've started making use of [Risk Storming,](https://riskstormingonline.com/) and I love it! The focus the Test Sphere cards can give you on Quality Aspects (aka Quality Characteristics) are really powerful.

![](/uploads/risk-storming-installability.PNG)

If we take a single Characteristic, say **Installability**, now we can focus not on the risks to the whole product, not on the quality of the whole product. We can focus just on this one aspect.

When we break down product quality into smaller parts, and prioritize them, it can make it much more tangible and we can make more useful assessments.

### Implicit and Explicit asks

One thing the focus on Quality Aspects, and the definition of quality beyond correctness really brings to light is that checking for Correctness really isn't enough, not even close. And to this end, testing Acceptance Criteria and explicit requirements falls way short.

A really great explanation of this is written up by another fantastic tester, and Exploratory Testing legend, [Callum Akehurst-Ryan](https://callumakehurstryansblog.wordpress.com/about-me/)**,** in the post [WHY CHECKING AN AC ISN’T ENOUGH](https://callumakehurstryansblog.wordpress.com/2021/08/25/why-checking-an-ac-isnt-enough/).

### On accessing and measuring quality

OK, so now I've defined what quality means to me. But, is this useful?

I feel that this short definition hides a huge amount of detail, of course it does, it's only a single Tweet. It also assumes you already have a really clear idea what I mean by Goodness, Usefulness and Correctness, and if you have consumed anything from Dan Ashby, you probably have this context, if not go and read [Dan Ashby's Adapting Crosby’s 4 absolutes of quality into a software context](https://danashby.co.uk/2019/09/30/adapting-crosbys-4-absolutes-of-quality-into-a-software-context/).

What I'm missing, still, is a way to strike a balance on how to measure and describe the current quality of a product, and report on that usefully. On one side, there is the huge amount of valuable and highly contextual detail you can gain from detailed testing notes and detailed reports. On the other, the "gut feel" RAG rating, or star rating.

Details are great, for communicating with Engineers and the team, but are hard to "report upwards". RAG statuses, or traffic light style ratings are _course_ and really don't provide enough context to be an honest current reflection of quality. Both ways have risks, and are not appropriate to communicate with everyone.

To be clear, I don't have the answer here, I'm still working on it.

## References

[Dan Ashby's Adapting Crosby’s 4 absolutes of quality into a software context](https://danashby.co.uk/2019/09/30/adapting-crosbys-4-absolutes-of-quality-into-a-software-context/)

[Quality Advocates with Dan Ashby, How “Good” is your Product? \[YouTube\]](https://www.youtube.com/watch?v=XMDm44QYHw8)

[A Useable Definition of Quality](https://dragonsforelevenses.com/2021/09/03/a-useable-definition-of-quality/)

[Modern Testing Principles](https://www.ministryoftesting.com/dojo/lessons/modern-testing-principles)

[WHY CHECKING AN AC ISN’T ENOUGH](https://callumakehurstryansblog.wordpress.com/2021/08/25/why-checking-an-ac-isnt-enough/)

[Windows XP](https://en.wikipedia.org/wiki/Windows_XP)
