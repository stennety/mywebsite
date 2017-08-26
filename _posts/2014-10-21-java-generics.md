---

published: true
title: Java Generics
---
## Background

Generics are a Java programming construct that allow you to use types as parameters when you define classes, methods, and interfaces. This provides a way for you to re-use the same code with different inputs.

There are several benefits to using generics:

* **Catching errors at compile time instead of runtime:** The Java compiler applies strong type checking to generics and will throw errors if there are any type safety violations. It is much easier to fix compile-time errors than runtime errors.
* To quote the book, [Head First Java](http://www.amazon.com/Head-First-Java-2nd-Edition/dp/0596009208), "With generics, you can create type-safe collections where more problems are caught at compile-time. Without generics, the compiler would happily let you put a Pumpkin into an ArrayList that was supposed to hold only Cat objects."
* **Generic Algorithms:** Using generics, you can create algorithms that operate on collections that contain different types. This provides the benefits of code re-use and readability.
* **Elimination of Casts:** Prior to the implementation of generics in Java, classes placed in arrays would be stored and retrieved as Objects. This would mean that you could, for example, place a Dog instance into an array, but you would have to typecast it back from Object to Dog. As mentioned earlier, this created the potential for runtime errors, because the array would not be type-checking for Cat instances being stored.

_This code snippet without generics requires casting:_

{% highlight java %}
Dog myDog = new Dog();
List list = new ArrayList();
list.add(myDog);
Dog d = (Dog) list.get(0); // Casting required here because list.get(0) returns an Object, not a Dog.
{% endhighlight %}

This code snippet, rewritten to use generics, does not require casting:

{% highlight java %}
Dog myDog = new Dog();
List list = new ArrayList<Dog>();
list.add(myDog);
Dog d = list.get(0); // No casting necessary!
{% endhighlight %}

This also adds type safety by preventing illegal objects from being stored in the array:

{% highlight java %}
Dog myDog = new Dog();
Cat badCat = new Cat();
List list = new ArrayList<Dog>();
list.add(badCat); // This actually won't compile because of this line. Can't add a Cat to a Dog array.
{% endhighlight %}

## Usage

Most of the time, the code you will write that deals with generics will be collection-related code. The way that you will use generics will be primarily in one of three ways:

Creating instances of generified classes:

{% highlight java %}
new ArrayList<Dog>()
 Declaring variables of generic types:
List<Dog> dogList = new ArrayList<Dog>();
 Declaring and invoking methods that take generic types:
void foo(List<Dog> list){
    // Method stuff here
}
x.foo(dogList); // Invoking the method
{% endhighlight %}

## Understanding the Documentation

The Java convention is to use "E" (for "element") as the stand-in for the type of element a collection class should accept.

For example:

{% highlight java %}
public class ArrayList<E> extends AbstractList<E> implements List<E>
{% endhighlight %}

So, when implementing ArrayList<Dog>, E becomes a Dog object.

In generics, "extends" means "extends" OR "implements."

{% highlight java %}
public static <T extends Comparable> void sort<List<T> list>
{% endhighlight %}

Normally, in Java, "extends" refers to class inheritance, where "implements" refers to interfaces. When dealing with generics, however, "extends" refers to both of these. Interfaces and classes are treated the same way.

Sure, the Java engineers probably could have used a new keyword, like "is," or something. But generally, whenever there is a chance to re-use an existing keyword, it is best to do that in order to lessen the risk of breaking existing code.

## References:

[http://docs.oracle.com/javase/tutorial/java/generics/why.html](http://docs.oracle.com/javase/tutorial/java/generics/why.html)
[Head First Java, 2nd Edition (book)](http://www.amazon.com/Head-First-Java-2nd-Edition/dp/0596009208)
