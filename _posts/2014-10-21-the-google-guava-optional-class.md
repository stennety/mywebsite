---

published: true
title: The Google Guava Optional class
---
Background

> "Null sucks." --[Doug Lea](http://en.wikipedia.org/wiki/Doug_Lea)

> "I call it my billion-dollar mistake. It was the invention of the null reference in 1965. At that time, I was designing the first comprehensive type system for references in an object oriented language (ALGOL W). My goal was to ensure that all use of references should be absolutely safe, with checking performed automatically by the compiler. But I couldn't resist the temptation to put in a null reference, simply because it was so easy to implement. This has led to innumerable errors, vulnerabilities, and system crashes, which have probably caused a billion dollars of pain and damage in the last forty years." --[Sir C. A. R. Hoare](http://en.wikipedia.org/wiki/C._A._R._Hoare)

The Google engineers behind the Guava Libraries state their motivation for the Optional class to be that "careless use of null can cause a staggering variety of bugs." In studying the Google code base, they found that around 95% of collections were not supposed to have any null values in them. In which case, having them fail immediately rather than to silently accept null would have drastically sped up the debugging process.

Null is the source of much ambiguity. Sometimes it can mean failure, sometimes success, but in either case, it gives no indication. For example, in Java, a Map.get() operation may return null if a value was absent (failure) or when the value was both present and null (success).

To avoid the use of null, the Google engineers designed many of Guava's utilities to fail quickly in the event of null, rather than allowing them to be used. This is where the Optional class comes in. In most cases, the use of null is to indicate absence. Either there was no value or one could not be found. Optional<T> is a way of replacing this convention with a non-null value. The Optional may contain a non-null T reference (in which case the reference is said to be "present") or it contains nothing (in which case the reference is said to be "absent").

The prototype for this class is:

{% highlight java %}
com.google.common.base.Optional<T>
{% endhighlight %}

Where "T" is a [generic](http://www.davidmerrick.me/2014/10/21/java-generics/) representing the type of instance that can be contained.

This class represents an immutable object that may contain a non-null reference to another object. An instance of this class either contains a non-null reference to an object, or is set to Optional.absent(). It never is null.

## Uses

Uses for this class include:

* To avoid the ambiguity of null;  to distinguish between an "unknown" value and one that is "known to have no value." This is a distinction that simply setting a variable to null does not provide.
* To be an alternative method return type. Instead of returning null, the method could return Optional.absent() to indicate that no value was available.
* To wrap nullable references for storage in a collection that does not support null.

## References

* [Google Code: Using and Avoiding Null](https://code.google.com/p/guava-libraries/wiki/UsingAndAvoidingNullExplained)
* [Class Optional<T>](http://docs.guava-libraries.googlecode.com/git/javadoc/com/google/common/base/Optional.html)
