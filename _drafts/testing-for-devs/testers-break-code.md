---
title: Testers break code
tags:
- testing-for-devs
- " testing-myths"
date: 2021-11-09 00:00:00 +0000

---
Stop me, if you have heard this before:

> Testers just break things!

> Testers just focus on edge cases that no user would really do

> It works on my machine, you're just a bug magnet

> It worked fine until the Tester touched it, they keep breaking things

So, breaking things can be fun. And I have, no myth, heard first hand from Testers who do enjoy finding problems. But are they actually breaking anything? And is that even their intention or purpose?

Let's do some myth busting, and dig a bit deeper!

![](/uploads/testers-break-code.jpg)

## It's already broken

Unless a Tester is actively changing code, fundamentally they can't have broken it. I think logically we all already know this to be true, so that's it. Myth busted right?

Hold on. We got this far, let us dig a little deeper.

## Testers break illusions about code

This can be split up into two parts, what working looks like, and how we learn if it's broken and then break the bad news!

### How do we know if it is working or broken?

This comes down to a combination of explicit and implicit requirements. Layered onto this are any quality characteristics, also known as quality aspects, that are a priority to us.

We need to build a shared understanding, a mental or recorded model of what "good enough" looks like. This might be expressed in acceptance criteria in a story, some kind of service level agreement. This could also come from quality aspects and risks we identified using techniques such as Risk Storming.

An excellent discussion on why explicit requirements alone are not enough can be found in this blog by Call [WHY CHECKING AN AC ISN’T ENOUGH](https://callumakehurstryansblog.wordpress.com/2021/08/25/why-checking-an-ac-isnt-enough/ "WHY CHECKING AN AC ISN’T ENOUGH") by [Callum Akehurst-Ryan](https://twitter.com/CAkehurstRyan "Callum Akehurst-Ryan").

Once we have an idea what good should look like, we ask questions of the system, or idea, this can take a number of forms that we call Testing. This can be any activity or experiment that allows us gain evidence about how the system DOES behave.

The results of running these experiments (Testing) help us to disprove part or all of our model, breaking our illusion on how we think the system works.

### Breaking the bad news

Now we have broken the illusion, what are we going to do about it?

## Testers manipulate and push systems to learn more

## Testers help answer questions

## Testers can suggest improvements

## Testers can improve ideas before code is written