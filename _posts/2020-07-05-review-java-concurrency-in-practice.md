---
published: false
title: 'Review: "Java: Concurrency in Practice"'
---
My tech reading for Q2 2020 was "Java: Concurrency in Practice." It was written in 2006, but it is still very relevant and doesn't show its age. There are occasional mentions of Java 5, but they're few and far between, and most of the concurrency primitives mentioned are still used. 

_Note that I'll probably keep this review relatively brief since it's already Q3 and there are some things I want to get moving on. So this will mostly be a collection, in no particular order, of highlights and things I learned while reading._

It was written by Brian Goetz, who I just learned was the spec lead for Lambdas in Java (JSR-335). As a frequent user and huge fan of Lambdas, thanks, Mr. Goetz, for those as well as for writing this book.

One distinction that Goetz introduces early on is of what it actually means to have thread-safe code. At its core, it's not about logic but about managing access to state, particularly shared, mutable state.

> Thread safety may be a term that is applied to code, but it is about state, and it can only be applied to the entire body of code that encapsulates its state, which may be an object or an entire program.

In order to ensure correctness when run concurrently, the program must be thread safe. 

> Correctness means that a class conforms to its specification. A good specification defines invariants constraining an object's state and postconditions describing the effects of its operations.

The easiest way to have thread safety is to just not have mutable state in the first place, if you can avoid it. But if you can't, changes to shared state must be atomic, made in a single, indivisible operation. 

An operation that is not atomic is the `++` increment operator. This is actually just syntactic sugar for three separate operations: Fetch the current value, add one to it, and write the new value back. This is also known as a "read-modify-write" operation. 

# Locking

This book dedicates a substantial number of pages to locking. Which makes sense, given that locking is so fundamental to enforcing access to shared state. I'd come across the term "reentrant lock" quite a bit before reading this book, but hadn't really understood what it meant. A reentrant lock is one that can be acquired again by the current thread.

For example, say you have these classes:

```java
public class Employee {
	public synchronized void doWork(){
	    ...
    }
}

public class TargetEmployee extends Employee {
  	public synchronized void doWork(){
     	...
        super.doWork();
    }
}
```

The call to `super.doWork()` would deadlock if it wasn't reentrant because it would be considered already held.

# Serializing shared access to objects

Serializing access to a shared object has nothing to do with converting it to a byte stream (i.e. JSON serialization), but just means that threads take turns accessing the object.

# Liveness vs Safety

One distinction Goetz makes is between liveness and safety. Safety means that "nothing bad happens," but liveness means that "something good eventually happens."

I was familiar with the term "deadlock" in computing, but there is also a failure case called "livelock." This is a situation in which two or more processes continually repeat the same interaction without doing any useful work. An analogy would be when two people are walking toward each other in a hallway. Person A moves to let Person B by, but Person B moves in the same direction. And then they do this repeatedly forever, neither making any progress. Like a deadlock, this results in resource starvation.
