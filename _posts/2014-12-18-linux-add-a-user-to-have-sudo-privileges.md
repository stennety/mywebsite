---

published: true
title: 'Linux: Add a user to have sudo privileges'
---
If there is no sudo group on your system, add one.

{% highlight shell %}
$ sudo groupadd sudo
{% endhighlight %}

If the sudoers file is not configured to allow the sudo group sudo access, add this.

{% highlight shell %}
$ visudo
{% endhighlight %}

{% highlight shell %}
# Allow members of group sudo to execute any command
%sudo   ALL=(ALL:ALL) ALL
{% endhighlight %}

Save the file. Next, add your  user to the sudo group.

{% highlight shell %}
$ usermod -aG sudo userName
{% endhighlight %}
