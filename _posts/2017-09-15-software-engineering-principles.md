---
published: true
title: Software Engineering Principles
---
The following are a few principles of good software engineering that I've learned in my career.

**Conway's Law:** Any organization that designs a system will produce a design whose structure is a copy of the organization's communication structure. i.e. if there are 4 teams designing a compiler, the end product will be a 4-pass compiler.

**Single Responsibility Principle:** Every class should have responsibility over a single part of the functionality provided by the software, and that responsibility should be entirely encapsulated by that class.

**SOLID:** Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion. [source](http://williamdurand.fr/2013/07/30/from-stupid-to-solid-code/)

**ACID:** Atomicity, Consistency, Isolation, Durability. A set of properties of database transactions intended to guarantee validity even in the event of errors, power failures, etc. [source](https://en.wikipedia.org/wiki/ACID).

**Dependency Inversion Principle (aka Inversion of Control)**

**Principle of Least Privilege:** Software shouldn't be executed with more authority than it needs to get its job done.

**Principle of Least Astonishment:** A typical articulation of this is: "If a necessary feature has a high astonishment factor, it may be necessary to redesign it." Basically, a component of a system should behave in a manner consistent with users' expectations. This also applies to code. Code should be written in such a way that it minimizes the surprise of someone reading it.

![]({{site.cdn_path}}/2017/09/15/wtf.png)

**Postel's Law (aka the Robustness Principle):** Be conservative in what you do, be liberal in what you accept from others. This was coined by Internet pioneer John Postel, who wrote in an early implementation of the TCP spec that "TCP implementations should follow a general principle of robustness: be conservative in what you do, be liberal in what you accept from others.

**Design Margin:** The safety factor of a system. i.e. if a system is designed to withstand 50 units of force but it can actually withstand 70, the design margin is 20 units. [Source](https://en.wikipedia.org/wiki/Factor_of_safety)

**The Boy Scout Rule (aka Kaizen)**: Always leave things cleaner than you found them. [Source](http://programmer.97things.oreilly.com/wiki/index.php/The_Boy_Scout_Rule)

**DRY (Don't Repeat Yourself)**

**YAGNI (You Ain't Gonna Need It):** A principle of extreme programming (XP) that favors not adding functionality until deemed necessary. Rephrased by XP co-founder Ron Jeffries, "Always implement things when you actually need them, never when you just foresee that you need them." [Source](https://en.wikipedia.org/wiki/You_aren%27t_gonna_need_it)

**Where to catch errors:** In general, it's best to catch errors and exceptions at the highest level possible.

**Optimization Adages:** "the fastest code is the code that doesn’t run," "premature optimization is the root of all evil."

**Amara's Law:** The adage, coined by American futurist Roy Amara, that "we tend to overestimate the effect of a technology in the short run and underestimate the effect in the long run." [source](https://en.wikipedia.org/wiki/Roy_Amara)

**Zebras:** "When you hear hoofbeats, think of horses not zebras"." A "Zebra" is the American medical slang for arriving at an exotic diagnosis when a more commonplace explanation is more likely. [source](https://en.wikipedia.org/wiki/Zebra_(medicine))

## Reference

http://www.sw-engineering-candies.com/blog-1/rules-of-thumb-in-software-engineering
