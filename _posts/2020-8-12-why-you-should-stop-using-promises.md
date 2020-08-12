---
layout: post
title: Why you should STOP using Promises!
---

Four years ago, I wrote some articles explaining how and why you should use JavaScript Promises: [Understanding JavaScript Promises](https://engineering.invisionapp.com/post/understanding-promises/) and [8 Tips for Mastering JavaScript Promises](https://engineering.invisionapp.com/post/mastering-promises/).  
Well, times have changed, and I'm here to say: you should STOP using Promises!

## Use async functions instead!

Let me get straight to the point. For async code, you should be using an `async function` (and its `await` syntax).  

Async functions allow us to use the same **language features** as our sync code, instead of using the Promise APIs. 
- `await` instead of `.then`
- `catch` instead of `.catch`
- `return` instead of `Promise.resolve`
- `throw` instead of `Promise.reject`
This results in cleaner, more consistent code.


## Promises are just _implementation details_

You might say "async functions are just syntax sugar for Promises".  But I disagree!  I'd argue that **async functions** were actually the end goal from the start.  Promises just bridged the gap, as a way to achieve some of the benefits of async programming before the language supported it.  Now that we have async function support, we've arrived.  Promises got us here, but now they're fading into an _implementation detail_.  I like to think of Promises like an async callstack; something you should be aware of, but for all intents and purposes, something you forget about.


## Promises are only needed for 2 scenarios

I think there's only 2 scenarios where you should use a `Promise` in your code.
1. Converting a callback API into Promise API, so it can be `await`ed.  For example, you might want to wrap `setTimeout`, or perhaps wrap a library that only supplies a callback API. It is your responsibility, then, to promisify that API, typically using a utility or simply `new Promise(...)`.
2. `Promise.all` is a useful utility that should be used for waiting for results in parallel.  

## Conclusion
The more you write async functions, the less you think about Promises.  They fade away into the background, and you get used to the clean, flat structure of `async` code.  
So if someone you know uses the Promise syntax, and it makes you cringe, please send them to this article.
