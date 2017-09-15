---
published: false
title: What is Dependency Injection?
---
In a nutshell, dependency injection is pushing a dependency into a class from the outside. One object supplies the dependency or dependencies of another object. "Injection" means passing the dependency into the dependent object or client.

What are the advantages of doing this?
- It decouples your class's construction from the construction of its dependencies.
- Makes code cleaner, easier to modify, and easier to reuse.
- Makes code more modular.

## Dependency Inversion Principle or Inversion of Control
This means that, rather than low-level code calling up to high-level code, high-level code can receive lower level code that it can call down to. 
Code should depend upon abstractions. By depending on abstractions, we're decoupling implementations from one another.