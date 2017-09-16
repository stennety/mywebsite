---
published: true
title: What is Dependency Injection?
---
In a nutshell, dependency injection is pushing a dependency into a class from the outside. One object supplies the dependency or dependencies of another object. "Injection" means passing the dependency into the dependent object or client.

Essentially, for each class, dependency injection is giving it the tools that it needs to do its job.

What are the advantages of doing this?
- Decouples classes from the construction of their dependencies.
- Improves reusability, modularity, flexibility.
- Makes code cleaner and easier to modify.

## How to inject dependencies

Usually, you want to use interfaces to pass in your dependencies. This makes for much better flexibility if dependency implementations need to change. There's a great (and slightly silly) example of a dad object and a dependency on kitchen appliances demonstrated [here](http://brandonclapp.com/what-is-dependency-injection-and-why-is-it-useful/). Using interfaces for the Microwave and Refrigerator allows the flexibility to change types of appliances on the fly without having to rewrite code in the Dad class.

## Dependency Inversion Principle or Inversion of Control

This means that, rather than low-level code calling up to high-level code, high-level code can receive lower level code that it can call down to. 
Code should depend upon abstractions. By depending on abstractions, we're decoupling implementations from one another.

## Popular frameworks for Dependency Injection in Java

- [Spring](http://www.vogella.com/tutorials/SpringDependencyInjection/article.html)
- [Guice](https://github.com/google/guice)


## References
- http://brandonclapp.com/what-is-dependency-injection-and-why-is-it-useful/
