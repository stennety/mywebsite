---
published: true
title: Good Java practices for clarity
---
# Enums instead of booleans

Using enums instead of booleans where appropriate can bring a lot of clarity to your code.

For example, say you had an access control implemented as follows:

{% highlight java %}
public class AccessControl {
	private boolean isPrivate;

	public boolean isPrivate(){
    	return isPrivate;
    }

	public boolean isPublic(){
    	return !isPrivate;
    }
}
{% endhighlight %}

Sure, you can call methods to determine if the access is public or private. But, for one thing, it's not very extensible. If you wanted to add another access level, such as "private to group", the code becomes much more complex. 

In any case, though, the code can be made clearer by using an enum:

{% highlight java %}
public static class AccessControl {

   public enum Level {
       PUBLIC, PRIVATE
   };

   private Level access;

   public Level getAccessLevel(){
       return access;
   }
}
{% endhighlight %}

Now, you can use conditional logic like:

{% highlight java %}
AccessControl accessControl = new AccessControl();
AccessControl.Level level = accessControl.getAccessLevel();
if(level.equals(AccessControl.Level.PRIVATE)){
	// do something
}
{% endhighlight %}

It's very clear which access level your logic is working with, and it's easy to extend to more enums if necessary.

# Specify your units!

When working with variables that reference quantities, it's extremely important to specify your units. Otherwise someone maintaining your code later (probably you!) won't be able to distinguish if you were referring to grams, dollars, feet, miles, milliseconds, seconds, or farthings. This can lead to very real problems; In 1999, NASA lost a [$125 million Mars probe](http://articles.latimes.com/1999/oct/01/news/mn-17288) because the programmers didn't take into account unit conversions.

So, if you're working with time, for example, instead of using 
{% highlight java %}
int TIME_ELAPSED = 10;
{% endhighlight %}

specify the units, such as
{% highlight java %}
int TIME_ELAPSED_MILLIS = 10;
{% endhighlight %}

# Never rely on enum ordinal values

When working with enums, be very explicit about their values. Never rely on their order to derive meaning. 

For example, instead of using
{% highlight java %}
public enum CompassPoint {
    North,
    East,
    South,
    West;
}
{% endhighlight %}

and relying on the order of those enums to derive their values, be explicit about their values, like this
{% highlight java %}
public enum CompassDirection {
    NORTH(0),
    EAST(90),
    SOUTH(180),
    WEST(270);
}
{% endhighlight %}

This reduces brittleness. Code that relies on the order of the enums won't break if they are reordered. Additionally, more enums can be added with out worrying about their order.

For more, see this discussion on StackOverflow: [Is enum order sensitivity an antipattern?](https://softwareengineering.stackexchange.com/questions/290842/is-enum-order-sensitivity-an-antipattern).
