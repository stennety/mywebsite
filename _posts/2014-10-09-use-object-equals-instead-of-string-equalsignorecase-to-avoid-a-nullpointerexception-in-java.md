---

published: true
title: >-
  Use Object.equals() instead of String.equalsIgnoreCase() to avoid a
  NullPointerException in Java
---
A NullPointerException in Java is thrown when an object is expected as a parameter, but null is passed instead. To avoid this when doing String comparisons, use Object.equals instead.

The method signatures for equals() and equalsIgnoreCase() are different (the former accepts an Object as a parameter and the latter accepts a String ), but they both return a boolean primitive value.

{% highlight java %}
public boolean equals(Object anObject);
public boolean equalsIgnoreCase(String anotherString);
{% endhighlight %}

This code will throw a NullPointerException if stringTwo is set to null:

{% highlight java %}
String stringOne = "Foo"
String stringTwo = "Bar";
boolean areTheyEqual = stringOne.equalsIgnoreCase(stringTwo);
{% endhighlight %}

This code serves the same function and doesn't throw the exception.

{% highlight java %}
String stringOne = "Foo"
String stringTwo = "Bar";
boolean areTheyEqual = stringOne.equals(stringTwo);
{% endhighlight %}
