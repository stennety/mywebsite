---
published: true
title: Useful Java snippets
---
Starting this post to keep track of some useful Java snippets I use/come across.

# Singleton Map/List

Need a map, but with just one object in it? Don't feel like going through all this boilerplate just to get that?

{% highlight java %}
Map<KeyType, ValueType> myMap = new HashMap<KeyType, ValueType>();
myMap.put(key, value);
thingThatNeedsAMap(myMap);
{% endhighlight %}

[Collections.singletonMap](https://docs.oracle.com/javase/6/docs/api/java/util/Collections.html#singletonMap%28K,%20V%29) to the rescue.

With one fell swoop, you've got yourself an immutable map:

{% highlight java %}
Collections.singletonMap(key, value);
{% endhighlight %}

In the same vein, there's also a [Collections.singletonList](https://docs.oracle.com/javase/6/docs/api/java/util/Collections.html#singletonList(T)) method for when you need a list with a single item.

# Generate a random String of a certain length

(Thanks to [this StackOverflow post](https://stackoverflow.com/questions/41107/how-to-generate-a-random-alpha-numeric-string))

Import `org.apache.commons.text.RandomStringGenerator`, and use it like this:

{% highlight java %}
RandomStringGenerator randomStringGenerator =
        new RandomStringGenerator.Builder()
                .withinRange('0', 'z')
                .filteredBy(CharacterPredicates.LETTERS, CharacterPredicates.DIGITS)
                .build();
randomStringGenerator.generate(12);
{% endhighlight %}

# Comma-separate a Collection of Strings with a StringJoiner

Say you have this List of Strings: `["Alice", "Bob", "Carol"]`, and you want to concatenate them into one String that's comma-separated.
Simply use a StringJoiner.

```
String commaSeparatedNames = names.stream()
     .collect(Collectors.joining(", "));
```

Reference: [Class StringJoiner](https://docs.oracle.com/javase/8/docs/api/java/util/StringJoiner.html)

# Convert between time units

You can use Java's [TimeUnit](https://docs.oracle.com/javase/7/docs/api/java/util/concurrent/TimeUnit.html) class to easily convert between time units. For example, convert 15 seconds to milliseconds with:

{% highlight java %}
TimeUnit.SECONDS.toMillis(15)
{% endhighlight %}

# Catch multiple exceptions

Java 7 syntax lets you catch multiple exceptions at once:

```
catch(RuntimeException | IOException | SQLException e)
```

Reference: [Java Catch Multiple Exceptions, Rethrow Exception](https://www.journaldev.com/629/java-catch-multiple-exceptions-rethrow-exception)
