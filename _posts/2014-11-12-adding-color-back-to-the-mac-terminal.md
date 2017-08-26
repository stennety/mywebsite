---

published: true
title: Adding color back to the Mac terminal
---
Did your terminal lose color after changing the color scheme? Add it back with these two lines in ~/.bash\_profile.

{% highlight shell %}
export CLICOLOR=1
export LSCOLORS=ExFxBxDxCxegedabagacad
{% endhighlight %}

Remember to reload it when you're done editing with

{% highlight shell %}
source ~/.bash_profile
{% endhighlight %}

![]({{site.cdn_path}}/2014/11/12/1.jpg)
