---

published: true
title: How to secure a Linux server from unauthorized SSH access
---
I've been doing a lot with [reverse SSH tunnels](https://www.davidmerrick.me/2014/10/19/creating-an-ad-hoc-vpn-on-osx-using-reverse-ssh-tunnels-and-launch-daemons/) for remote support lately, and wanted to make sure that my VPS was locked down. Here are the steps I took to make that happen.

## 1\. Disable root login.

In /etc/ssh/sshd_config:

{% highlight shell %}
PermitRootLogin no
{% endhighlight %}

As a rule, you should always execute tasks with the lowest required privilege level. You can always use sudo to temporarily escalate privileges when necessary.

## 2\. Setup SSH keys and disable password authentication.

This protects you from brute-force password attacks.

Follow [my guide](http://www.davidmerrick.me/2014/11/09/how-to-setup-ssh-key-based-authentication/) to configure SSH keys on your client.

In /etc/ssh/sshd_config:

{% highlight shell %}
# Change to no to disable tunnelled clear text passwords
PasswordAuthentication no
{% endhighlight %}

## 3\. Sandbox user accounts.

I have a set of users that I just use for reverse SSH tunnels to their corresponding machines. I want these users to be sandboxed so they can't sudo, exit their user directories, or do anything but log back into their machines, really.

One way to do this is with a chroot jail. This is a virtual directory structure in which a user's home directory appears to be the root when they login. This totally prevents access to sensitive directories like /etc/ without having to deal with messy Linux permissions.

Follow [this guide](http://how-to.linuxcareer.com/how-to-automatically-chroot-jail-selected-ssh-user-logins) to configure this.

Finally, restart your SSH server to update your changed settings.

{% highlight shell %}
sudo service ssh restart
{% endhighlight %}
