---

published: true
title: Automating SFTP authentication with SSH keys
---
I spun up a VPS recently and needed to pull files down via SFTP. I automated this process by using SSH keys and a BASH script.

First, if you haven't already, generate a public and private SSH key pair.

{% highlight shell %}
$ sudo mkdir ~/.ssh
$ ssh-keygen -t rsa
{% endhighlight %}

Next, dump the contents of the ~/.ssh/id_rsa.pub file and copy them.

{% highlight shell %}
cat ~/.ssh/id_rsa.pub
{% endhighlight %}

Or, if you're on OSX, you can dump the contents directly into the clipboard.

{% highlight shell %}
cat ~/.ssh/id_rsa.pub | pbcopy
{% endhighlight %}

Using an SFTP client (like FileZilla, Cyberduck, or Transmit), create an ~/.ssh/authorized\_keys file on the SFTP server. Paste the public key you just copied into that file and save it.

Now, you should be able to download files from the server without being prompted for a password.

{% highlight shell %}
$ sftp -r -P [port] [user]@[ip]:/directory/to/download/from/filename* /destination/directory/here
{% endhighlight %}
