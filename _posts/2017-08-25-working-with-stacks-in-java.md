---
layout: post
published: false
title: Working with Stacks in Java
---
There is a native [Stack data structure](https://docs.oracle.com/javase/7/docs/api/java/util/Stack.html) in java.utils that comes in very handy. It's implemented as a last-in-first-out (LIFO) stack, as you'd expect, and has push() and pop() methods to add and remove objects, respectively.

I encountered a recent technical interview question that I decided to use it for. The question was about checking whether a String of brackets was balanced. Here's the solution I came up with:

{% gist 634b4977a9296482fee44afcf3af3c94 %}
