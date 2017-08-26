---

published: true
title: Controlling iTunes from the OSX terminal
---
There are several things you can do with iTunes in the OSX terminal.

Get the currently playing track name:

{% highlight shell %}
osascript -e 'tell application "iTunes" to name of current track as string'
{% endhighlight %}

Get the currently playing artist name:

{% highlight shell %}
osascript -e 'tell application "iTunes" to artist of current track as string'
{% endhighlight %}

Play the next song:

{% highlight shell %}
osascript -e 'tell application "iTunes" to next track'
{% endhighlight %}

Play the previous song:

{% highlight shell %}
osascript -e 'tell application "iTunes" to next track'
{% endhighlight %}

Pause playback:

{% highlight shell %}
osascript -e 'tell application "iTunes" to pause'
{% endhighlight %}

Resume playback:

{% highlight shell %}
osascript -e 'tell application "iTunes" to play'
{% endhighlight %}

Mute playback:

{% highlight shell %}
osascript -e 'tell application "iTunes" to set mute to true'
{% endhighlight %}

Unmute playback:

{% highlight shell %}
osascript -e 'tell application "iTunes" to set mute to true'
{% endhighlight %}

Quit iTunes:

{% highlight shell %}
osascript -e 'tell application "iTunes" to quit'
{% endhighlight %}
