---

published: true
title: How to change the default screenshot directory on OSX
---
{% highlight shell %}
defaults write com.apple.screencapture location ~/Screenshots
{% endhighlight %}

You can also change the screenshot image format:

{% highlight shell %}
defaults write com.apple.screencapture type jpg
{% endhighlight %}

To load your changed settings:

{% highlight shell %}
killall SystemUIServer
{% endhighlight %}
