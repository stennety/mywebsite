---

published: true
title: How to return an array to a Robot variable
---
(And by "Robot," I mean the Robot Framework)

Here's how to return an Array from a Java function to a Robot variable. Simply use Java's Array syntax (a List won't work–Robot deals with only Strings, ints, and Arrays).

In Robot:

{% highlight python %}
@{robotArray} =    My Robot Keyword
{% endhighlight %}

In the underlying Java:

{% highlight java %}
@RobotKeyword
String[] myRobotKeyword(){
   // do stuff here and return a String array
}
{% endhighlight %}
