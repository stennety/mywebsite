---
published: true
title: What is Type Erasure?
---
Type erasure means to remove explicit typing from a program at compile time. 
In other words, type constraints are only enforced at compile time and discarded at runtime.

Here's an example, borrowed from [this post](http://www.baeldung.com/java-type-erasure):

Before compilation, this method operates on an element of generic type E:

```
public <E> boolean containsElement(E [] elements, E element){
    for (E e : elements){
        if(e.equals(element)){
            return true;
        }
    }
    return false;
}
```

After compilation, however, E's type information is discarded and replaced with *Object*:

```
public boolean containsElement(Object [] elements, Object element){
    for (Object e : elements){
        if(e.equals(element)){
            return true;
        }
    }
    return false;
}
```

# Why Object? Does type erasure always revert back to Object?

No; in this case, E was a generic element, so its type was unbound. 
In the case where E is bound as a subclass of a type, it would be replaced with that type. 
Let's say, instead of being a generic, E extended a class called *Foo*.

Pre-compilation:

```
public <E extends Foo> boolean containsElement(E [] elements, E element){
    for (E e : elements){
        if(e.equals(element)){
            return true;
        }
    }
    return false;
}
```

Post-compilation:

```
public boolean containsElement(Foo [] elements, Foo element){
    for (E e : elements){
        if(e.equals(element)){
            return true;
        }
    }
    return false;
}
```

Notice how the bound generic E was replaced with Foo.

# Why type erasure?

Type erasure first appeared in Java along with [generics](https://en.wikipedia.org/wiki/Generics_in_Java) in [5.0](https://en.wikipedia.org/wiki/Criticism_of_Java#Language_syntax_and_semantics). The reason for using type erasure for this was to allow for backwards compatibility for migrating code and to allow for reuse of existing classes.  The Java compiler uses type erasure to replace all type parameters in generic types with their bounds or ```Object``` if the type parameters are unbounded. In this way, type erasure makes sure that no new classes are created for parameterized types, resulting in generics incurring no runtime overhead.

# Benefits

One benefit, as mentioned [here](https://stackoverflow.com/questions/20918650/what-are-the-benefits-of-javas-types-erasure) is that type erasure makes it easier to reason about how the code will actually perform on the machine.

As mentioned [here](http://vineelkumarreddy.com/2016/01/30/the-rationale-behind-javas-type-erasure/), type erasure strikes a balance between having the compiler generate all templates of a generic class (as C++ does) and having to infer that at runtime (as C# does). The result of this balance is less bulky bytecode while maintaining the performance of not inferring those types at runtime. It also means that generics perform as well at runtime as parameterized types, since these are effectively the same at runtime.

Compile-time type correctness.

# Is it used in any other languages?

As far as I've been able to gather, type erasure is not used in any languages other than Java. But please correct me in the comments if I'm wrong about that!

# Alternatives to type erasure

Are there alternatives to type erasure? Yes, reification is an alternative. I wrote about reification in [this post](https://www.davidmerrick.me/2015/07/19/reification-vs-erasure-in-java-collections/).

Essentially,

> Reification is the process by which an abstract idea about a computer program is turned into an explicit data model or other object created in a programming language.

(source: [Wikipedia](https://en.wikipedia.org/wiki/Reification_(computer_science)))

# References 
- [http://www.baeldung.com/java-type-erasure](http://www.baeldung.com/java-type-erasure)
- [https://stackoverflow.com/questions/20918650/what-are-the-benefits-of-javas-types-erasure](https://stackoverflow.com/questions/20918650/what-are-the-benefits-of-javas-types-erasure)
- [The rationale behind Java's Type Erasure](http://vineelkumarreddy.com/2016/01/30/the-rationale-behind-javas-type-erasure/)
