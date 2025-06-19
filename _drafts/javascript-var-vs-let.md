---
layout: "post"
title: "Context in JavaScript closures"
---

`var` is function scope, `let` is block scope. Thats what most of us know, but what does it mean?
A closure use the context and will be executed later after the context variable is changed.

// Scenario A: With "var" the context variable will be hoisted and only declared one time so the later execution of the closures will give two times the same output, the current value of the context variable

var getters = [];
for (var value of ['first', 'second']) {
    getters.push(() => value);
}
getters.map(getter => console.log(getter()));

// output:
//     second
//     second

// Scenario B: With "var" but a self executed function wrapper around the closure the value of the context variable will be copied into a new context variable and so the later execution will give different outputs

var getters = [];
for (var value of ['first', 'second']) {
    getters.push((copy => () => copy)(value));
}
getters.map(getter => console.log(getter()));

// output:
//     first
//     second

// Scenario C: With "let" its now much more easier and doesn't need anymore a function wrapper. The context variable is blocked scoped and so only declared for the current loop

var getters = [];
for (let value of ['first', 'second']) {
    getters.push(() => value);
}
getters.map(getter => console.log(getter()));

// output:
//     first
//     second
