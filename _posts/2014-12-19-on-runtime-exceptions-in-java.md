---

published: true
title: On Runtime Exceptions in Java
---
From the [Java API Docs](http://docs.oracle.com/javase/7/docs/api/java/lang/RuntimeException.html):

> RuntimeException and its subclasses are unchecked exceptions. Unchecked exceptions do not need to be declared in a method or constructor's throws clause if they can be thrown by the execution of the method or constructor and propagate outside the method or constructor boundary.

You can handle unchecked exceptions with try-catch blocks, but you don't have to.
