---

published: true
title: The Singleton design pattern in Java
---
In Java, sometimes it can be useful to have exactly one instance of a class. This is known as a Singleton pattern. A logger, print spooler, or window manager would be potential uses for this.

In essence, a Singleton ensures that a class has a single instance, and a global point of access to it. The class declaration typically looks like this:

{% highlight java %}
public class mySingleton {
   private static mySingleton instance = null;
   protected mySingleton() {
      // Protected constructor to prevent instantiation.
   }
   public static mySingleton getInstance() {
      if(instance == null) {
         instance = new mySingleton();
      }
      return instance;
   }
}
{% endhighlight %}

For a much more in-depth guide to this design pattern, check out [http://www.javaworld.com/article/2073352/core-java/simply-singleton.html](http://www.javaworld.com/article/2073352/core-java/simply-singleton.html)
