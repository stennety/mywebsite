---

published: true
title: Advantages of Immutability in Java
tags: java
---
An immutable object is one whose state or data cannot change after construction. Common immutable objects from the JDK include Strings and Integers.

Making use of immutable objects provides several advantages, including:

* Simplicity of construction, use, and testing.
* Thread-safety. Threads can access the object in parallel without conflicts or the need for locks.
* No need for a copy constructor.
* No need to make copies of the object, thus no need for an implementation of clone.
* Allow hashCode to use lazy initialization and caching of its return value.
* They make good Map keys and Set elements, whose objects cannot change state while in the collection.
* Failure atomicity; if an immutable object throws an exception, it will never be left in an undesirable or indeterminate state.

When should immutability be used in your classes?

"Classes should be immutable unless there's a very good reason to make them mutable….If a class cannot be made immutable, limit its mutability as much as possible." --Joshua Bloch, author of Effective Java.

That being said, here are some guidelines for making a class as immutable as possible:

* Ensure that the class cannot be overridden by making it final, using static factories, or keeping constructors private.
* Make the class's fields private and final.
* Force callers to construct an object completely in a single step. As opposed to a zero-argument constructor and later calls to setter methods.
* Do not provide any methods which can change the state of the object. This extends beyond setter methods to any method that can change the object's state.
* If the class has any mutable object fields, they must be defensively copied when passed between the class and its caller.

References:
[http://www.javapractices.com/topic/TopicAction.do?Id=29](http://www.javapractices.com/topic/TopicAction.do?Id=29)
