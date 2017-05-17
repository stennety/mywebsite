---
layout: post
published: true
title: Reification vs. Erasure in Java Collections
---
This is another concept I came across in Joshua Bloch's "Effective Java." According to [Wikipedia](https://en.wikipedia.org/wiki/Reification_(computer_science)),  

> Reification is the process by which an abstract idea about a computer program is turned into an explicit data model or other object created in a programming language.

A reified collection in Java is one that enforces its element types at runtime. A collection that is implemented using erasure enforces its types at compile time (and "erase" their element type information at runtime).

This is especially apparent when it comes to arrays and lists. Arrays are reified, while lists that use generics use erasure.

For example, this won't compile, because generics enforce their type at compile time (erasure):

{% highlight java %}
List<Object> ol = new ArrayList<Long>()
ol.add("I don't fit in");
{% endhighlight %}


This will compile, but will fail at runtime, because arrays are reified.

{% highlight java %}
Object[] objectArray = new Long[1];
objectArray[0] = "I don't fit in"
{% endhighlight %}
