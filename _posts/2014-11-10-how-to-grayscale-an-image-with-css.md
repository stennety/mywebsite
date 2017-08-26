---

published: true
title: How to grayscale an image with CSS
---
[CSS3 filters](http://www.html5rocks.com/en/tutorials/filters/understanding-css/) work in most browsers and allow web developers to add interesting effects to photos, including converting them to grayscale.

Assuming you have an image with class "grayscale," you can add a filter using a normal CSS selector like this:

{% highlight html %}
<img class="grayscale" src="myImage.jpeg" />
{% endhighlight %}

{% highlight css %}
img.grayscale { -webkit-filter: grayscale(100%);
-moz-filter: grayscale(100%);
filter: grayscale(100%);
}
{% endhighlight %}

Reference:
[http://demosthenes.info/blog/532/Convert-Images-To-Black-And-White-With-CSS](http://demosthenes.info/blog/532/Convert-Images-To-Black-And-White-With-CSS)
