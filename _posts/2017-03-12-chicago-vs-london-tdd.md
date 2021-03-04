---
post_title: Chicago vs London TDD
author: dreat
layout: post
published: true
post_date: 2017-03-12 22:04:29
permalink: 2017/03/12/chicago-vs-london-tdd/
tags: [archived, software_engineering, testing]
categories: [theory, tests, old_blog]
---
Somewhere near my very beggining of my software engineering journey, as a fresh Junior, I happened to talk with a collegue of mine. I remember him saying:
<p style="text-align: center;">So, when someone says [during the interview]
<em> -I know TDD!</em>
I ask:
<em> -So tell me the difference between Chicago and London style.</em></p>
This happened to be The Great Filter, as many people didn't know that. Luckily this wasn't my interview as I didn't know either. So, naturally, I did some googling.

It turns out, that it's not rocket science at all.
Let's say we're testing the metods talking with DB (using some injectable context, of course)
Chicago style focuses on results. So here you check, if result that you get back is the same as expected.
London style focuses on behavior. So here you mock the context and then validate if methods you need to call were called defined number of times.
<blockquote>Chicago style focuses on <strong>results</strong>. London style focuses on <strong>behavior</strong>.</blockquote>
So, it's easy, right? Also - you can also mock in Chicago style, and by getting the results you want test behavior, right? And why is it that important?

I'll start with second question. If you start mocking around and check for results, your setup/arrange parts tend to grow and be more and more complicated. Also, if you want to test results, you have to provide some sensible data. This makes testing more cumbersome than needed and results in greater reluctancy in writing them. In my opinion those kind of tests work best with integration/end-to-end tests and also with unit testing, were you have no "complex" (or maybe any?) side effects. Pure functions are great example - for same input, always same output, without any side effects. It's very easy to write those tests and arrange part will be small, if almost not existent.

When you verify behavior, you don't care about carefully setting up mock, populating data, thinking about complex relations. You just want to know that system behaves in a way yout want it to behave. Databases, messaging systems, IO operations etc are fine places. You have other kinds of tests to check if your system is working correctly with those alive elements. Here you want to check if you handle them correctly.

It's easy, yeah. Don't seem that important. But it's really easy to forget London style and check for result everywhere. Writing tests starts to be painful, they take more time and, out of nowhere, you're dug under pile of complexity.
"But I did unit testing, why is this happening?!"
Because maybe there's more to writing tests than just Assert.AreEqual(expected, actual) ;)

&nbsp;

PS: Both ways are equally important and have their own purpose. Don't just focus only on one and you should be fine.
