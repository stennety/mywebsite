---

published: true
title: How to tunnel VNC over SSH
---
![]({{site.cdn_path}}/2014/11/08/vnc.jpg)

My sister teaches in Qatar and got some browser-hijacker malware on her MacBook. I was happy to help her fix it, but I was unfortunately not able to travel the 7,500 miles to take care of the problem in person. I sent her some terminal commands over iMessage which she executed to set up a reverse SSH tunnel to my VPS. I used this to give me shell access to the machine. But I still needed to see the screen. Fortunately, OSX provides access to a ton of functionality through the terminal.

VNC stands for "Virtual Network Computing," and is the protocol that OSX uses for remote desktop connections.

SSH has three advantages for tunneling VNC. First, it's encrypted. VNC (the remote desktop protocol) is unencrypted by default so wrapping it in SSH adds security. Second, it provides compression if given the right flag. This makes your remote screen more responsive, which is what you want when doing tech support. (We both had fast connections, so I didn't use it. But it's easy to do by adding the -C flag after the ssh command.) And finally, ssh allows you to forward connections over multiple hops. In my case, I was on my laptop at my apartment and needed to connect to my VPS and then to her. SSH allowed me to create a tunnel straight to her machine through which I could forward a remote desktop connection.

## The Process

First, SSH into the destination machine and enable remote desktop. Warning: this sets the password to "mypasswd". It's highly recommended that you change this.

{% highlight shell %}
sudo /System/Library/CoreServices/RemoteManagement/ARDAgent.app/Contents/Resources/kickstart -activate -configure -access -on -clientopts -setvnclegacy -vnclegacy yes -clientopts -setvncpw -vncpw mypasswd -restart -agent -privs -all
{% endhighlight %}

Next, create an SSH tunnel to the remote machine. In my case, I connected to the remote Mac using a reverse SSH tunnel through a server in between my computer and it. The port you choose for the local connection doesn't matter too much. But make sure that the remote end is forwarded to port 5900, the VNC port.

{% highlight shell %}
ssh -v -L9000:localhost:9000 user1@machine1 -t ssh -v -L9000:localhost:5900 user2@machine2
What this does is forward SSH on port 9000 on your local machine to port 9000 on your server/midpoint host to port 5900 on the remote machine.
{% endhighlight %}

Note: in my case, since I had a reverse SSH tunnel to the destination machine running on port 12348 of my server, I had to specify the port number.

{% highlight shell %}
ssh -v -L9000:localhost:9000 user1@machine1 -t ssh -v -L9000:localhost:5900 user2@machine2 -p 12348
Now, you should be able to connect over VNC to the remote Mac. OSX has a remote desktop client built in. Simply open Safari and visit this URL to launch it.
{% endhighlight %}

![]({{site.cdn_path}}/2014/11/08/vnc2.jpg)

Finally, disable remote desktop for security purposes.

{% highlight shell %}
sudo /System/Library/CoreServices/RemoteManagement/ARDAgent.app/Contents/Resources/kickstart -deactivate -configure -access -off
{% endhighlight %}
