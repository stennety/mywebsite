---

published: true
title: How to install Cacti 0.7.8D plugin architecture on Ubuntu 9.10
---
Original Problem: My ISP is fast but they limit my monthly bandwidth.

Original Solution: Cacti is an excellent network monitoring tool, so I decided to use it along with its Threshold plugin to monitor my home network via my hacked WRT-54GL router (DD-WRT firmware) using SNMP and send me an e-mail alert if I overused bandwidth in the past 24 hours.

New Problem: The Cacti install went well on my VMWare Ubuntu 9.10 box, but getting the Plugin Architecture running to support the Threshold plugin was an 8-hour, red-eyed nightmare because of terrible documentation on how to do this on my particular setup.

New Solution: I ended up manually hacking the source code and tediously editing, testing, and repeating until it started working. I'm posting this mostly for my own reference because this was such a pain to set up, but I hope that it's useful for you. If it doesn't work on your setup, leave a comment below and I'll help out as best as I'm able!

Note–I'm presuming your setup is the same as mine, which is:

Ubuntu 9.10
Apache2
PHP5
MySQL
Cacti 0.7.8d
If you haven't installed Cacti yet, follow this step-by-step [Cacti guide](http://www.ubuntugeek.com/install-and-configure-cacti-monitoring-tool-in-ubuntu-9-10-karmic-server.html) on UbuntuGeek.com.

Let's get down to business:

1\. Backup Cacti settings and database, just in case:

{% highlight shell %}
# cd /usr/share/cacti
# cp -R site site_backup
# mkdir database_backup
# mysqldump -u root -p cacti > database_backup/cacti.sql
{% endhighlight %}

Back it up again to your home folder (I mis-typed a command and deleted all my files accidentally at one point):

{% highlight shell %}
# exit
$ mkdir ~/cacti_backup
$ sudo cp -R ./* ~/cacti_backup
{% endhighlight %}

2\. Patch the Plugin Architecture onto your Cacti install with [this guide](http://felimwhiteley.wordpress.com/2008/02/13/quick-how-to-cacti-087a-with-plugin-arch-on-ubuntu-gutsy/). Instead of downloading the version that he specifies, however, [download this one](http://forums.cacti.net/download.php?id=16370), rename it to "patch.zip", unzip it, and continue with the instructions in the guide.

3\. From around line 201-205, comment out these lines like so:

{% highlight shell %}
//include_once($config["library_path"] . "/functions.php");
//include_once($config["include_path"] . "/global_constants.php");
//include_once($config["include_path"] . "/global_arrays.php");
//include_once($config["include_path"] . "/global_settings.php");
{% endhighlight %}

4\. From around lines 213-222, paste in the lines between "Start New Stuff" and "End New Stuff":

{% highlight shell %}
/* include additional modules */
include_once($config["library_path"] . "/functions.php");
//Start New Stuff
include_once($config["include_path"] . "/global_constants.php");
include_once($config["library_path"] . "/plugins.php");
include_once($config["include_path"] . "/plugins.php");
include_once($config["include_path"] . "/global_arrays.php");
include_once($config["include_path"] . "/global_settings.php");
//End New Stuff
include_once($config["include_path"] . "/global_form.php");
{% endhighlight %}

And you should be good to go! I hope it helps, and if not, please post a comment and I'll see what I can do!

PS: If you are still having problems with your install, try [this older (but still relevant) guide](http://www.askaboutphp.com/42/cacti-ubuntu-cacti-plugin-invalid-php_self-path.html).
