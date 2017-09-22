---
published: true
title: Software Engineering Principles
---
The following are a few principles of good software engineering that I've learned in my career.

**Conway's Law:** Any organization that designs a system will produce a design whose structure is a copy of the organization's communication structure. i.e. if there are 4 teams designing a compiler, the end product will be a 4-pass compiler.

**Single Responsibility Principle:** Every class should have responsibility over a single part of the functionality provided by the software, and that responsibility should be entirely encapsulated by that class.

**Dependency Inversion Principle (aka Inversion of Control)**

**Principle of Least Privilege:** Software shouldn't be executed with more authority than it needs to get its job done.

**Principle of Least Astonishment:** A typical articulation of this is: "If a necessary feature has a high astonishment factor, it may be necessary to redesign it." Basically, a component of a system should behave in a manner consistent with users' expectations. This also applies to code. Code should be written in such a way that it minimizes the surprise of someone reading it.

![]({{site.cdn_path}}/2017/09/15/wtf.png)

**Postel's Law (aka the Robustness Principle):** Be conservative in what you do, be liberal in what you accept from others. This was coined by Internet pioneer John Postel, who wrote in an early implementation of the TCP spec that "TCP implementations should follow a general principle of robustness: be conservative in what you do, be liberal in what you accept from others.

**[Design Margin:](https://en.wikipedia.org/wiki/Factor_of_safety)** The safety factor of a system. i.e. if a system is designed to withstand 50 units of force but it can actually withstand 70, the design margin is 20 units. 

**DRY (Don't Repeat Yourself)**

**YAGNI (You Ain't Gonna Need It)**

**Where to catch errors:** In general, it's best to catch errors and exceptions at the highest level possible.

**Kaizen:** Leave things better than how you found them.

## References:

http://www.sw-engineering-candies.com/blog-1/rules-of-thumb-in-software-engineering
