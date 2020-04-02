---
post_title: Property testing
author: dreat
layout: post
published: true
post_date: 2017-05-20 19:00:38
tags: [archived, testing, software_engineering]
categories: [theory, tests, old_blog]
---
During ElixirConfEu in Barcelona, I learned about Property Testing. It looks pretty neat and it got me interested. Basics sound quite easy but there’s more than meets the eye and I’ve been reading/listening about it for a while.
As I don’t feel comfortable enough to do a deep dive into the topic I will do an introduction to it. After I get a deeper understanding with some “real life” examples (or maybe doing them myself) I will write a follow-up.

Property testing is a term originating from Haskell lib called QuickCheck. It was created to ease the pain of writing many tests. Instead of writing n specific unit test you can generate them.

Using QuickCheck (here is the list of ports to your language of choice) you define a property of a piece of code you’re testing.

For trivial example – if you were to write your own ordering function you can define few properties – if you order it twice the result won’t change, the only change is the position of elements (so you don’t hanger values) and so on.

QuickCheck then generates data, runs n tests using this random data and if it finds failing case it executes something called shrinking – trying to find minimal failing case. It can ease up debugging or seeing straight away what’s wrong.

While it’s all fun, I’m still not sure what are the cases in a commercial code where this is the best approach. Also, turns out that properties also form kind of patterns – and I’m yet to learn about all this.

Nevertheless, I’m quite hyped and want to learn more – it seems more of easy to get, hard to master useful tool than a novelty, but only time will tell.
