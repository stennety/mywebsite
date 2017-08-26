---

published: true
title: Advantages of Primitives in Java
---
Java has some nice classes that wrap Primitives (Integer, Boolean, etc). In recent versions of Java, these classes can be used interchangeably with Primitives. So why use Primitives at all, ever? One of my coworkers recently told me that he makes use of Primitives as much as possible because they're never allowed to be null. Since the Java wrappers for Primitives are references to objects, it is in fact possible for them to be null. As I've written before, it's best practice to avoid null wherever possible.
