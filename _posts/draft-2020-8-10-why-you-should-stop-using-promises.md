---
layout: post
title: Why you should STOP using Promises!
---

Four years ago, I wrote some articles explaining how and why you should use JavaScript Promises: [Understanding JavaScript Promises](https://engineering.invisionapp.com/post/understanding-promises/) and [8 Tips for Mastering JavaScript Promises](https://engineering.invisionapp.com/post/mastering-promises/).  
Well, times have changed, and I'm here to say: you should STOP using Promises!

## Use async functions instead!
Let me get straight to the point.  You should be using an `async function` for ALL async code.  
You should NOT use `promise.then/catch`, `Promise.resolve/reject`, or `new Promise`.  A lot of _good developers_ are still using these constructs, but I'm about to convince y'all to stop.

An async function has many advantages over Promise-based code:
1. They're _flat_, and they don't require nested callbacks.  The most simple Promise-based code always requires nesting
2. Let me repeat, they're _flat_.  Seriously, the code quality difference is dramatic.
**Promises are an implementation detail**
