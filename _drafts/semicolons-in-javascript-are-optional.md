https://gist.github.com/Sharaal/0a86afbd4972433d79fa29b586f72064

---
layout: post
title: Semicolons in JavaScript are optional?
---

I won't make a suggestion for this nearly religion discussion using or omitting semicolons in JavaScript. But I experienced they are not always optional and omitting them can result in errors. So I will describe these scenarios and the workarounds.
<!--more-->

## JavaScript Semicolon Insertion



## Error scenarios

### Immediatly executing anonymous function



```javascript
console.log('example')
(async () => {})()
```

Results in error `TypeError: console.log(...) is not a function`.

### Destructioning



```javascript
let a, b
const c = [1, 2]
[a, b] = c
```

Results in error `ReferenceError: c is not defined`.

## Workarounds



## Summary

Semicolons are not always optional, but with the rule of thumb `start lines with ; when they start with [ or (` it's easy to avoid the problematic scenarios and omitting semicolons.
