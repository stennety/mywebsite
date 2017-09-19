---
published: false
title: What is Type Erasure?
---
In programming, type erasure refers to the compile-time process in which explicit typing is removed from a program. In Java, this is used in the implementation of [Generics](https://en.wikipedia.org/wiki/Generics_in_Java). The compiler user type erasure to replace all type parameters in generic types with their bounds or ```Object``` if the type parameters are unbounded. In this way, type erasure makes sure that no new classes are created for parameterized types, resulting in generics incurring no runtime overhead.