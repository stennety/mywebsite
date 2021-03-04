---
post_title: Property based testing 101
author: dreat
layout: post
published: true
post_date: 2020-05-17
tags: [testing, software_engineering]
categories: [theory, tests, new_blog]
---

##### this is a loose transcription of my <a href="{{ site.baseurl }}/presentations/PropertyBasedTesting101/index.html"><u>talk</u></a>

Before I'll explain Property Based Testing let me give some context.

### Why do we test?

Let's start with answering that question.

All different answers I got while presenting this talk boil down really to just one thing: **confidence**.

We want to have confidence that:
- what we implemented is correct
- we didn't break anything old when adding new
- we didn't break anything when we refactor

We add more tests and more techniques to get this confidence, but ask yourself - are you confident with your tests suite? Are you sure you got all the corner cases?

### Some real life examples

Let's take a look at 3 projects that used Property Based Testing

1. Riak - a key-value distributed storage used PBT to find some wonky errors with just simple read/write operations. Yes, just two operations (add distrubution) and you could find strange corner cases.
2. LevelDB - there were 20+ calls (and then 30+) to introduce some errors in that databse.
3. Volvo - (luckily before releasing to the market) - when you hit brakes and turned volume up, the breaks didn't work. It was because of inverted bitness of radio - instead of lower priority it would get the highest

### How many tests are enough?

Let's take a closer look on LevelDB example.
Imagine that you have only 2 possible calls to use. With first error you'd need to test 2^20 cases to find it. With 30, 2^30. You get the idea.
Obviously there are more possible options, so we have even more tests to write.

Should we write all those tests?

### Let computer write tests for you!

All tests we write (Unit, Integration, etc etc) can be categorized as "Table Based Testing" or "Example Based Testing". We provide input, action and expected output. Those are great for testing regressions, are amazingly fast to learn and write, but are limited by our imagination and time.

On the other end we have Property Based Testing, for which we need to provide different things.

#### What is included in PBT?

1. Property - that is a system's _property_ that should always be true. For example:
```
length(list) == length(reverse(list))
assert reverse(reverse(list)) equals list
assert reverse(list)[k] equals list[length(list)-k]
```
In this example we define HOW reverse works, and not providing examples of WHAT should happen.

2. Generator - this will generate valid inputs for our tests. Interesting things here are:
- it will run tests multiple times (configurable), each time with random data
- it will increase entropy - it will start with common, small values and, with time, it will make weirder and larger data. Example? String will start with alphanumeric values, then add special characters, unicode etc. All with longer and longer strings.

There are built-in generators for primitives, that we can use to build more complex ones.

```
str <- generate_string

-> "a"
-> "gi43"
-> ".,dką\n"
etc..
```

3. Shrinking - the killer feature (if two previous were not enough) - when PBT will find failing test case it will try to find minimal failing test case

(Let's assume that our `reverse` function will drop element 42.)
```
Failed: [-10, -8, ..., 42, ... 87, 100]
Shrinking...
Minimal failing test case: [42]
```

The true power is shown when we take a look at our LevelDB example. Imagine having loads of logs. You have no idea why there are errors and need to find those 20 calls (and you don't know that there are 20 calls!) in all this noise. This test will find you 20+, 30+ and even 100+ fails (given long enough testing). Additionally we'll get seed for all test runs, so we can repeat if needed.

### Why should I care?

I hear you. You are an OOP programmer, and while functional stuff is interesting, you won't use it. Or you are functional programmer, but have no interest in testing reverse function.

Let's address those
- There are implementations in many languages, C#, Ruby, Python, Java, C++ to name a few
- There are many real life use cases. You don't need to create your own DB or car to benefit from PBT. One of the obvious examples is validating user input. No one can predict what users will input. PBT can generate so wild examples that are beyond our imagination. But it can be used basically to everything

### Where's the catch?

It sounds too good to be true, there must be something more, right? And there is. 

1. Those tests can be slow. If you run your tests 1k times, it's obvious those will run longer.
2. More important - this takes time to learn. Finding properties is a skill. When one starts it's difficult to find anything at all. It's not as easy as just writing an unit test. But the investment is worth it
