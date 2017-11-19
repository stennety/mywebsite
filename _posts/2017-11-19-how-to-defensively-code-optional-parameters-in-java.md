---
published: false
title: How to defensively code Optional parameters in Java
---
Let's start with the assumption that [null is evil](https://sidburn.github.io/blog/2016/03/20/null-is-evil). There are a million posts out there on this topic, so I won't beat a dead horse on that. 

_Note: I wrote up some source code with unit tests for this example. You can find that here: [https://github.com/davidmerrick/defensive-optionals](https://github.com/davidmerrick/defensive-optionals)._

Say you have this Cat object. A cat, naturally, can optionally have laser vision.

{% highlight java %}
public class Cat {
    public Optional<LaserVision> laserVisionOptional;
}
{% endhighlight %}

{% highlight java %}
public class LaserVision {
    public void shootLasers(){
        System.out.println("pew pew pew!");
    }
}
{% endhighlight %}

![]({{site.cdn_path}}/2017/11/19/laser-cats.jpg)

All good, right? Well, what if you did this?

{% highlight java %}
@Test
public void noLaserVisionByDefault(){
    Cat cat = new Cat();
    boolean hasLaserVision = cat.laserVisionOptional.isPresent();
    Assert.assertFalse(hasLaserVision);
}
{% endhighlight %}

D'oh!

{% highlight java %}
java.lang.NullPointerException
	at com.davidmerrick.CatTest.noLaserVisionByDefault(CatTest.java:10)
	at java.base/
{% endhighlight %}

That Optional parameter is initialized to _null_. Which sort of defeats the purpose of using an Optional in the first place.

We can solve this by initializing the object to `Optional.empty()`.

{% highlight java %}
public class Cat {
    public Optional<LaserVision> laserVisionOptional = Optional.empty();
}
{% endhighlight %}

Now, our `noLaserVisionByDefault()` test passes. But, we're not quite done. What if someone inadvertently sets that parameter to null?

{% highlight java %}
@Test
public void noLaserVisionByDefault(){
    Cat cat = new Cat();
    cat.laserVisionOptional = null;
    boolean hasLaserVision = cat.laserVisionOptional.isPresent();
    Assert.assertFalse(hasLaserVision);
}
{% endhighlight %}

Argh!

{% highlight java %}
java.lang.NullPointerException
	at com.davidmerrick.CatTest.noLaserVisionByDefault(CatTest.java:12)
{% endhighlight %}

The way to defend against this is to make the `laserVisionOptional` parameter private, then enforce its value via a setter. 

{% highlight java %}
public class Cat {

    private Optional<LaserVision> laserVisionOptional = Optional.empty();

    public void setLaserVisionOptional(Optional<LaserVision> laserVisionOptional) {
        if(laserVisionOptional == null){
            this.laserVisionOptional = Optional.empty();
        } else {
            this.laserVisionOptional = laserVisionOptional;
        }
    }

    public Optional<LaserVision> getLaserVisionOptional() {
        return laserVisionOptional;
    }
}
{% endhighlight %}

Now, even if someone tries to set that parameter to _null_, it will instead be set to `Optional.empty()`.

## tl;dr

- null is bad.
- Defensive coding is good.
- protect your Optional parameters from being null by initializing them and by enforcing their values via setters.