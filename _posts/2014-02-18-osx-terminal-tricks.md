---

published: true
title: OSX terminal tricks
---

1\. Pop up a message in the Finder
{% highlight shell %}
osascript -e ‘tell app "Finder" to display dialog "Hello World"‘
{% endhighlight %}

2\. Make your computer talk
{% highlight shell %}
say hello
{% endhighlight %}

3\. Change the location where screenshots are stored
{% highlight shell %}
defaults write com.apple.screencapture location /new_location_here
{% endhighlight %}

4\. Show all hidden files by default
{% highlight shell %}
defaults write com.apple.finder AppleShowAllFiles true
killall Dock

# And hide them again with
defaults write com.apple.finder AppleShowAllFiles false
killall Dock
{% endhighlight %}

5\. Prevent your computer from going to sleep for an extended period of time
{% highlight shell %}
caffeinate -t 3600 
{% endhighlight %}

6\. Get Time Machine to back up every 30 minutes instead of every hour
{% highlight shell %}
sudo defaults write /System/Library/Launch Daemons/com.apple.backupd-auto StartInterval -int 1800
{% endhighlight %}

7\. Add a login greeting banner (displayed to all users on the lock screen)
{% highlight shell %}
sudo defaults write /Library/Preferences/com.apple.loginwindow LoginwindowText "Good Morning, Dave"
{% endhighlight %}

8\. Make the icons on the dock massive
{% highlight shell %}
defaults write com.apple.dock largesize -int 512; killall Dock
{% endhighlight %}

9\. Disable the startup chime
{% highlight shell %}
sudo nvram SystemAudioVolume=%80
{% endhighlight %}

10\. Enable remote desktop (Screen Sharing/VNC) access to your computer _(warning: this sets the password to "mypasswd." It is highly recommended that you change this)_
{% highlight shell %}
sudo /System/Library/CoreServices/RemoteManagement/ARDAgent.app/Contents/Resources/kickstart -activate -configure -access -on -clientopts -setvnclegacy -vnclegacy yes -clientopts -setvncpw -vncpw mypasswd -restart -agent -privs -all

# Disable remote desktop

sudo /System/Library/CoreServices/RemoteManagement/ARDAgent.app/Contents/Resources/kickstart -deactivate -configure -access -off
{% endhighlight %}
