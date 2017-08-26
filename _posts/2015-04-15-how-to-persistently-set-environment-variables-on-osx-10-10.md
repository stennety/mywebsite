---

published: true
title: How to persistently set environment variables on OSX 10.10
---
In OSX Yosemite, for security reasons, Apple disabled the ability to set environment variables from the /etc/launchd.conf file. But never fear, you can still set them with a LaunchAgent.

1\. Create a plist file.

{% highlight shell %}
$ touch ~/Library/LaunchAgents/environment.plist
{% endhighlight %}

2\. In that file, place the environment variable you want to set in this format:

{% highlight XML %}
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>my.startup</string>
  <key>ProgramArguments</key>
  <array>
    <string>sh</string>
    <string>-c</string>
    <string>
    launchctl setenv FOO bar
    </string>

  </array>
  <key>RunAtLoad</key>
  <true/>
</dict>
</plist>
{% endhighlight %}

Where "FOO" is the variable to set and "bar" is the value to set it to.

3\. Activate the plist file, either by restarting or by executing

{% highlight shell %}
$ launchctl load ~/Library/LaunchAgents/environment.plist
{% endhighlight %}

Reference: [Setting environment variables via launchd.conf no longer works in OS X Yosemite? – Stack Overflow](Setting environment variables via launchd.conf no longer works in OS X Yosemite? – Stack Overflow)
