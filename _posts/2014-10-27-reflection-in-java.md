---

published: true
title: Reflection in Java
---
Code Introspection is the ability to inspect the code in a system and to see object types. Reflection is the ability to make use of code introspection to modify classes at runtime.

Reflection is important because it allows a programmer to develop programs that do not have to "know" everything at compile time, which makes them more dynamic. Many modern frameworks make use of reflection extensively. The [Spring](http://spring.io/) framework, for example, uses reflection to create its beans.

The java.lang.reflect library provides classes and interfaces for obtaining reflective information about classes and objects.

Some common uses of reflection in Java include:

* Loading and using classes that are unknown at compile time, but have set methods.
* Instantiating arbitrary classes.
* Wrapping or mocking up a class. jMock uses reflection to create a synthetic class that implements an interface for testing purposes.
* To test a program by forcing it into a specific state.
* By debuggers in order to inspect running programs.
* To design frameworks or libraries that can interoperate with user-defined classes, where the framework author doesn't know what the members or classes will be ahead of time.

According to the [Core Java 2](http://www.amazon.com/Core-Java-Volume-Fundamentals-Edition/dp/0130471771) book,

> The reflection library gives you a a very rich and elaborate toolset to write programs that manipulate Java code dynamically...heavily used in JavaBeans, the component architecture for Java.. Using reflection, Java can support tools like the ones to which users of Visual Basic have grown accustomed.

References:

* [Java API Docs: java.lang.reflect](http://docs.oracle.com/javase/7/docs/api/)
* [http://courses.cs.washington.edu/courses/cse142/12su/exploreFiles/reflection/reflection.pdf](http://courses.cs.washington.edu/courses/cse142/12su/exploreFiles/reflection/reflection.pdf)
* [http://stackoverflow.com/questions/37628/what-is-reflection-and-why-is-it-useful](http://stackoverflow.com/questions/37628/what-is-reflection-and-why-is-it-useful)
