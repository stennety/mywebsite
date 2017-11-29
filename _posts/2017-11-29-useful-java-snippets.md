---
published: true
title: Useful Java snippets
---
Starting this post to keep track of some useful Java snippets I come across.

## Singleton Map

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
