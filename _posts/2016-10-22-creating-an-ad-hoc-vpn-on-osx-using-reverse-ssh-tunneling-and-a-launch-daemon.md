---
layout: post
published: false
title: Creating an ad hoc VPN on OSX using reverse SSH tunneling and a launch daemon
---
Are you annoyed by setting up VPNs?

Do you hate SSH port forwarding?

Need to have remote shell access to a Mac from anywhere in the world?

Reverse SSH tunnels to the rescue!





A reverse SSH tunnel is exactly what it sounds like; an SSH tunnel in reverse. Your computer connects to a remote server and then opens up a tunnel back to itself. You can then connect to that server and have access to your machine. This is a very clean way to get around the problem of dealing with NAT traversal and firewalls. No port forwarding necessary.

OSX supports launch daemons. These are processes that start up when you boot up your Mac. It’s simple to use a launch daemon to keep the SSH tunnel alive for remotely accessing the machine anytime. The daemon will reconnect to the server immediately after the event of a connection drop or if your IP address changes.

The Process

1. Enable SSH on your Mac.

Go to System Preferences -> Sharing. Enable the “Remote Login” checkbox and add your username to the whitelist.