---

published: true
title: Securing a Linux server with port knocking
---
I'd come across an obscure reference to port knocking in a security book and was curious to try it out. Essentially, port knocking is a way of firewalling connections to certain ports (such as SSH) pending a predefined "knock" sequence of TCP connections. This acts like a sort of "open sesame"-esque password and can be very secure if used in conjunction with other forms of authentication, such as SSH keys. Any scans by an attacker will reveal all ports closed. Your legitimate users, knowing the predefined knock sequence, will be able to get the server to open up your protected service to them.

I was able to implement this on my own DigitalOcean VPS with the knockd daemon and [this guide](https://www.digitalocean.com/community/tutorials/how-to-use-port-knocking-to-hide-your-ssh-daemon-from-attackers-on-ubuntu). It was cool to see it working, but ultimately proved to be of only theoretical use to me; I use git and reverse SSH tunnels for doing support on friends and family's computers and this broke both of those. Plus I have other layers of security on my server, including key-based authentication. Still, it's a cool thing to check out and I recommend trying it.
