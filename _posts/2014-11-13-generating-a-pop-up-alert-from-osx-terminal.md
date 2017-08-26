---

published: true
title: Generating a pop-up alert from OSX terminal
---
You can use the terminal on OSX to generate a pop-up alert. Simply enter:

{% highlight shell %}
osascript -e 'tell app "System Events" to display dialog "Hello World"'
{% endhighlight %}

![]({{site.cdn_path}}/2014/11/13/5.png)
