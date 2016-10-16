---
layout: post
published: true
title: Using Imagemagick to remove GoPro fisheye distortion
---
One of my coworkers recently discovered a trick to remove fisheye distortion on GoPro images using ImageMagick. This command does the trick:

{% highlight shell %}
convert original.jpg -distort barrel '0.06335 -0.18432 -0.13009' result.jpg
{% endhighlight %}

Using this, he was able to convert this image:

![1-1024x768.jpg]({{site.baseurl}}/media/1-1024x768.jpg)

Into this one:

![1_test-1024x768.jpg]({{site.baseurl}}/media/1_test-1024x768.jpg)
