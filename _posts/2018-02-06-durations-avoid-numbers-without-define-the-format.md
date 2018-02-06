---
layout: post
title: Durations - Avoid numbers without define the format
---

Durations are easy to understand. They are the timespan between two timestamps. But they are hard to manage, because different APIs need different formats: milliseconds? seconds? Also they should be human readable.
<!--more-->

## Formats

JavaScript handles timestamps and durations in milliseconds. That can be error-prone if used together with other APIs like Redis, which handles them in seconds (and an expire of 3000 days instead of 3 days can be a problem, someday).

Because of this I avoid to use variables of `number`, hand over durations always as `object` and the consumer which knows his needed format use his format:

```javascript
function expire(expire) {
  // JavaScript needs milliseconds with e.g. setTimeout
  setTimeout(
    () => console.log('expired'),
    expire.millisecond()
  );

  // Redis needs seconds
  redis.expire('key', expire.second());
}
```

## Readability

The duration should be constructable by a string (to be defined by a environment variable) and easy to read by a human. So I came up with this:

```javascript
// instead of
const expire = 3 * 24 * 60 * 60 * 1000;

// and never with a comment which can be wrong someday
const expire = 3 * 24 * 60 * 60 * 1000; // 1 day

// define it with the format
const expire = duration('3 day');
```

## Summary

Handle numbers without a definition for what they stand for can be error-prone, not only for durations. So always define the format to avoid confusions and convert it into the right format depending on the context.

For durations feel free to have a look at [@dnode/duration](https://www.npmjs.com/package/@dnode/duration).
