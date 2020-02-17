---
published: true
title: '"Working Effectively with Legacy Code" book review'
---
I read a technical book every quarter, and my pick for Q1 2020 was "Working Effectively with Legacy Code." Captivating title, am I right? My team recently inherited a tangled rat's nest of legacy services, so I thought this would be a useful read to get a sense for how to address these. It’s written by Michael C. Feathers, a renowned software consultant whose resume includes being the Chief Scientist at Obtivia, a senior consultant at Object Mentor International, and a member of the technical staff at Groupon.

I was pleasantly surprised. It was a very approachable, practical read. It introduces concepts gradually, and refers back to them frequently. It’s full of concise definitions, analogies, and simple algorithms for minimizing risk when making changes to legacy codebases. Even though it was written in 2005, the ideas it presents are still very pertinent (especially to me, unfortunately). The overarching theme of the book is in favor of increasing test coverage by breaking apart tangled dependencies.

# What is legacy code?

Feathers starts off with a simple, working definition of legacy code:

> Legacy code is simply code without tests.

# Benefits of tests

Behavior is central to understanding the benefits of testing:

> Behavior is the most important thing about software. It is what users depend on. Users like it when we add behavior (provided it is what they really wanted), but if we change or remove behavior they depend on (introduce bugs), they stop trusting us.

Tests act as a safety net when making changes to a system. Without tests, there is no verifiable way to know whether a change to one part of the codebase might introduce a change to behavior somewhere else. One way to think of tests is as a “software vise.” Like the analogous tool, tests clamp down behavior. This way, when code changes are made, we can be more confident that the resulting behavior is consistent with what is desired.
How to get tests in place in legacy codebases

There is often a Catch 22 when testing legacy codebases; "When we change code, we should have tests in place. To put the tests in place, we often have to change code." In these cases, he advocates a few different approaches, the crux of which is to break dependencies so that tests can be put in place. 

The approach he suggests for making changes to legacy codebases is as follows:
1. Identify change points.
1. Find test points.
1. Break dependencies.
1. Write tests.
1. Make changes and refactor.

Another useful term is a "seam." A seam, in this context, is "a place where you can alter behavior in your program without editing in that place." The analogy is to a seam in clothing, the place where two parts are stitched together. In software, these places are generally places where there are well-defined interfaces. This can be leveraged to change the implementation using techniques such as dependency injection or mocking in the case of writing tests.

# Making changes to legacy code

Feathers suggests several approaches for making changes to legacy systems, one of which is the "sprout method" or "sprout class."

## Sprout approach

When adding a new feature to a legacy system that can be articulated as new code, write it as a new method. Then, call it from the places where that new functionality needs to be. This approach can also be taken with classes. This approach has the advantage of creating a seam where tests can be put in place. The disadvantage is that you could end up with duplicated code.

# Conclusion

As a software engineer, it's inevitable that you'll be working with legacy code at some point in your career. This book provides a useful framework for making legacy code less legacy. In my current role, we're ultimately trying to eliminate these legacy projects, but we will have to live with them for the time being, so I'm actively using approaches that Feathers discusses in this book to get test coverage in place. If you work in software, you should read this book.
