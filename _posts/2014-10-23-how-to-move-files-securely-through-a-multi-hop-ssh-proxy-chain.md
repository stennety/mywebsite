---

published: true
title: How to move files securely through a multi-hop SSH proxy chain
---
Sometimes, you may find yourself in a position where you need to securely copy some files through an SSH tunnel that spans multiple hops. Never fear, because it's just as easy as a couple of terminal commands.

![]({{site.cdn_path}}/2014/10/23/transparent-mulithop.png)

First, set up your proxy SSH chain. Here's an example command to set up a tunnel that will listen on port 9000 of your local machine and connect over two hops on port 22 to a remote machine:

{% highlight shell %}
ssh -v -L9000:localhost:9000 user1@machine1 -t ssh -v -L9000:localhost:22 user2@machine2
{% endhighlight %}

Then, in a different terminal, you can run the SCP command as you would normally. Just point it at the local port you just set up.

{% highlight shell %}
scp -P 9000 username@localhost
// Where username is your user name
// on the remote host that's last in
// the chain.
{% endhighlight %}
