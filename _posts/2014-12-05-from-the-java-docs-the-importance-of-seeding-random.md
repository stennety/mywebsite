---

published: false
title: 'From the Java Docs: The importance of seeding Random'
---
Randomness is crucial in computer science for applications including but certainly not limited to cryptography. The randomness of a random-number generator is really pseudo-random and depends heavily on the number that has been used to seed it. If the same seed is used, bad things can happen.

> If two instances of Random are created with the same seed, and the same sequence of method calls is made for each, they will generate and return identical sequences of numbers. In order to guarantee this property, particular algorithms are specified for the class Random.