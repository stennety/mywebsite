---
layout: post
title: Write async code in JavaScript
---

... 

## Callbacks

Callbacks are functions which we hand over to another functions which calls them after an event is triggered (async) or 
immediately after some blocking operations (sync).

In JavaScript its a common behavior a callback gets called not only if something is finished successfully, also if some 
error happens to give the possibility to handle that error. Because of this its common a callback function gets the 
error as first parameter, which needs to be checked.

```javascript
doSomething((err, data) => {
  if (err) {
    console.log('doSomething finished with an error');
    return;
  }
  console.log('doSomething is successfully finished');
});
```

Pros:

* Easy to use in easy scenarios

Cons:

* Errors must be handled in every callback function
* Gets really fast unreadable in nested scenarios (naming "callback hell"): 

```javascript
doSomething((err, data) => {
  if (err) {
    console.log('First doSomething finished with an error');
    return;
  }
  console.log('First doSomething is successfully finished');
  doSomething((err, data) => {
    if (err) {
      console.log('Second doSomething finished with an error');
      return;
    }
    console.log('Second doSomething is successfully finished');
  });
});
```

* Gets even more complicated if things should run in parallel and things should run after that: 

```javascript
const results = [];

doSomething((err, data) => {
  if (err) {
    console.log('One doSomething finished with an error');
  } else {
    console.log('One doSomething is successfully finished');
  }
  results.push({ err, data });
  if (results.length === 2) {
    console.log('Both doSomething are finished');
  }
});

doSomething((err, data) => {
  if (err) {
    console.log('One doSomething finished with an error');
  } else {
    console.log('One doSomething is successfully finished');
  }
  results.push({ err, data });
  if (results.length === 2) {
    console.log('Both doSomething are finished');
  }
});
```

## async package

...

Pros:

* ...

Cons:

* ...

## Promises

...

Pros:

* Chain promises allows a more central error handling

```javascript
doSomething(data)
  .then(data => { console.log('First doSomething is successfully finished'); })
  .then(data => doSomething(data))
  .then(data => { console.log('Second doSomething is successfully finished'); })
  .catch(err => { console.log('One doSomething finished with an error'); });
```

Cons:

* Errors must be handled in every chain
* A lot of callbacks are still in use

## co package

...

Pros:

* ...

Cons:

* ...

## async/await keywords

...

Pros:

* Native keywords for flow control (if, for/while) and error handling (try/catch)
* No boilerplate and callbacks results in compact code which can be better readable

Cons:

* Promises are not completely abstracted (e.g. Promise.all is needed for parallelism)
* Not all libraries (especially the Node.js standard libraries) support promises
* It is needed to keep in mind code looks sync, but it is and behave still async
