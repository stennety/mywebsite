---

published: true
title: Setting up and configuring a local Wordpress installation with mod\_rewrite
---
I recommend setting up a local WordPress installation to test any new plugins before you install them on your live site because I'm a firm believer in Murphy's law. I can't say how many times I've run into embarrassing, unexpected compatibility issues with older WordPress versions or other plugins that took my site offline. It's easy to repair a damaged local site, but not so easy to repair a bigger site with more traffic while it's live. You would think that this would be a straightforward process given the millions of blogs on the internet there using WordPress, but I've found that most of the time it's a pain.

Before we get started, here's what I have set up (and what I'm presuming that you do, too):

1\. Ubuntu Linux 9.10 running in a VMWare virtual machine.
2\. A working LAMPP stack (Linux, Apache2, MySQL, PHP, Perl) running on this machine.
3\. A folder directory structure that mirrors my live server. You can do this most easily with symlinks if you need to make any changes to the default setup.

First, enable and activate mod\_rewrite (Apache's URL rewriting engine, which is usually critical to running WordPress) on your Apache server:

{% highlight shell %}
$ sudo su
# a2enmod rewrite
# /etc/init.d/apache2 restart
{% endhighlight %}

Check that it's enabled:

{% highlight shell %}
$ cd /etc/apache2/mods-enabled
$ grep mod_rewrite *
{% endhighlight %}

If you see output containing "mod\_rewrite," you're good to go.

Edit the configuration so Apache will allow overrides to it's default configuration:

{% highlight shell %}
nano /etc/apache2/sites-enabled/000-default
{% endhighlight %}

On line 9, you should see a group of directives that look like this. Change "AllowOverride None" to "AllowOverride All" .

{% highlight xml %}
<Directory /var/www>
        Options Indexes FollowSymLinks MultiViews
        AllowOverride All
        Order allow,deny
        allow from all
</Directory>
{% endhighlight %}

Restart Apache again:

{% highlight shell %}
$ sudo /etc/init.d/apache2 restart
{% endhighlight %}

After that, download your site's files into your local directory, export your database from your site (follow [this guide](http://stereointeractive.com/blog/2010/04/19/moving-wordpress-site-to-another-server/)), and import it locally and you shouldn't have any problems. Enjoy!
