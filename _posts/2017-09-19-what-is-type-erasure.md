---
published: false
title: What is Type Erasure?
---
Type erasure refers to the compile-time process in which explicit typing is removed from a program. In other words, type constraints are only enforced at runtime and discarded at compile time.

Here's an example, borrowed from [this post](http://www.baeldung.com/java-type-erasure):

Before compilation, this method operates on an element of generic type E:

```
public static  <E> boolean containsElement(E [] elements, E element){
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
public static  boolean containsElement(Object [] elements, Object element){
    for (Object e : elements){
        if(e.equals(element)){
            return true;
        }
    }
    return false;
}
```

Why Object? Does type erasure always revert back to Object?

No; in this case, E was a generic element, so its type was unbound. In the case where E is bound as a subclass of a type, it would be replaced with that type. Let's say, instead of being a generic, E extended a class called *Foo*.

Pre-compilation:

```
public static  <E extends Foo> boolean containsElement(E [] elements, E element){
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
public static boolean containsElement(Foo [] elements, Foo element){
    for (E e : elements){
        if(e.equals(element)){
            return true;
        }
    }
    return false;
}
```

Notice how the bound generic E was replaced with Foo.

# Benefits



# Usage in implementation of generics

In Java, type erasure is used in the implementation of [Generics](https://en.wikipedia.org/wiki/Generics_in_Java). The compiler user type erasure to replace all type parameters in generic types with their bounds or ```Object``` if the type parameters are unbounded. In this way, type erasure makes sure that no new classes are created for parameterized types, resulting in generics incurring no runtime overhead.

# References 
- [http://www.baeldung.com/java-type-erasure](http://www.baeldung.com/java-type-erasure)
- [https://stackoverflow.com/questions/20918650/what-are-the-benefits-of-javas-types-erasure](https://stackoverflow.com/questions/20918650/what-are-the-benefits-of-javas-types-erasure)