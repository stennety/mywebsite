---

published: true
title: 'Functional programming in Java: using Predicates'
---
## Functional Programming

First, a quick introduction to functional programming. According to Wikipedia, [functional programming](http://en.wikipedia.org/wiki/Functional_programming) is a paradigm of structuring your programs that treats computation as the evaluation of mathematical functions, instead of procedures and mutable data. I took a class on functional programming in college, and the professor summed it up succinctly: "Procedural programming describes elements of a program in terms of what they do, while functional programming describes elements of a program in terms of what they are." For this reason, functional programs tend to be much shorter than ones that are written procedurally.

## Google Guava

[Guava](https://code.google.com/p/guava-libraries/) is a project that contains several core libraries that Google relies on for their Java-based projects, including collections, caching, primitives support, concurrency libraries, common annotations, string processing, and I/O. Some of these libraries contain code that implements [functional idioms](https://code.google.com/p/guava-libraries/wiki/FunctionalExplained).

Note: Google added a caveat on their wiki about using these.

> As of Java 7, functional programming in Java can only be approximated through awkward and verbose use of anonymous classes. This is expected to change in Java 8, but Guava is currently aimed at users of Java 5 and above.

> Excessive use of Guava's functional programming idioms can lead to verbose, confusing, unreadable, and inefficient code. These are by far the most easily (and most commonly) abused parts of Guava, and when you go to preposterous lengths to make your code "a one-liner," the Guava team weeps.

## Using Predicates

Predicates are a functional programming concept that describe a transformation on an input. Basically, take a list of objects as input, and apply the predicate to them.

In the Guava library, they are implemented simply as the following interface:

{% highlight java %}
apply(T input): boolean
{% endhighlight %}

To use this interface, simply define a predicate and an apply method within it. To illustrate this, compare it to a procedural method of finding an entry in a phone book matching certain criteria.

{% highlight java %}
public PhoneBookEntry personsNameIs(String name, ArrayList<PhoneBookEntry> entries){
  for (PhoneBookEntry entry : entries) {
    if (entry.getName().equals(name)) {
      return entry;
    }
  }
  return null;
}
{% endhighlight %}

(I realize this is a really inefficient way to search a phone book and we'd be better off with a binary search algorithm, but bear with me for the sake of example)

{% highlight java %}
public PhoneBookEntry phoneNumberIs(String phoneNumber, ArrayList<PhoneBookEntry> entries) {
  for (PhoneBookEntry entry : entries) {
    if (entry.getPhoneNumber().equals(phoneNumber)) {
      return entry;
    }
  }
  return null;
}
{% endhighlight %}

As you can see, we're re-using a lot of code between these two methods. The only thing that's really changing is the conditional logic within the if statement.

A better (or, at least, more functional programmy) way to do this would be to have a single method that loops through the phone book and applies the predicate at each iteration…

{% highlight java %}
public PhoneBookEntry phoneBookEntryMatchesPredicate(Predicate<PhoneBookEntry> condition, ArrayList<PhoneBookEntry> entries) {
  for (PhoneBookEntry entry : entries) {
    if (condition.apply(entry)) {
      return entry;
    }
  }
  return null;
}
{% endhighlight %}

...then, define the predicates…

{% highlight java %}
public Predicate<PhoneBookEntry> personsNamePredicate(String name)       
    Predicate<PhoneBookEntry >condition = new 
    Predicate<PhoneBookEntry>() {
        public boolean apply(PhoneBookEntry entry) {
            return entry.getName().equals(name);
        }
    }
    return condition;
};

public Predicate<PhoneBookEntry> phoneNumberPredicate(String phoneNumber)       
    Predicate<PhoneBookEntry >condition = new 
    Predicate<PhoneBookEntry>() {
        public boolean apply(PhoneBookEntry entry) {
            return entry.getPhoneNumber().equals(phoneNumber);
        }
    }
    return condition;
};
{% endhighlight %}

...and finally, call them in each method.

{% highlight java %}
public PhoneBookEntry personsNameIs(String name, ArrayList<PhoneBookEntry> entries){
    Predicate<PhoneBookEntry> condition = personsNamePredicate(name);
    return phoneBookEntryMatchesPredicate(condition, entries);
}

public PhoneBookEntry phoneNumberIs (String phoneNumber, ArrayList<PhoneBookEntry> entries){    
    Predicate<PhoneBookEntry> condition =   
    personsNamePredicate(phoneNumber);
    return phoneBookEntryMatchesPredicate(condition,   
    entries); 
}
{% endhighlight %}

Sure, if you know you're ultimately only going to need to match a couple of conditions, you're probably better off going  with the procedural option. The advantage of using predicates is that they're extremely flexible, reusable, and it's very easy to define new ones.

References:

[A touch of functional style in plain Java with predicates](http://cyrille.martraire.com/2010/11/a-touch-of-functional-style-in-plain-java-with-predicates-part-1/)
