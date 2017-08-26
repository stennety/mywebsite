---

published: true
title: How to setup SSH key-based authentication
---
Want to log in to your Linux server without using your password AND be more secure? You can do this with SSH keys.

SSH Keys consist of a public and private keypair, generated with a cryptographic algorithm. These keys serve as a means of authenticating to a server using public key cryptography and challenge response authentication. Using SSH keys has two advantages over password authentication. First, convenience–you can authenticate using the key and no longer need to use a password. Second, (assuming you've disabled password authentication on your server) you protect yourself from brute-force password attacks.

Let's get started.

On your client, generate a public and private keypair using the terminal.

{% highlight shell %}
ssh-keygen -t rsa
{% endhighlight %}

Stick with the defaults by just hitting Enter through the interactive prompts.

Next, add your public key to the ~/.ssh/athorized_keys file on your server.

{% highlight shell %}
cat ~/.ssh/id_rsa.pub | ssh user@remoteserver "cat >> ~/.ssh/authorized_keys"
{% endhighlight %}

Now you should be able to login to your server without your password.

{% highlight shell %}
ssh user@remoteserver
{% endhighlight %}

If you run into trouble, make sure that the permissions are set correctly on your ssh folders on client and server. The ~/.ssh folder should have permissions 700. Your private key should have permissions 600. Your public key and known hosts file should have permissions 644. And authorized_keys should have permissions 664.

Reference:

[https://wiki.archlinux.org/index.php/SSH_keys](https://wiki.archlinux.org/index.php/SSH_keys)
