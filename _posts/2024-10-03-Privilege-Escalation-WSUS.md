---
layout: post
title: Exploiting WSUS misconfiguration to priviledge escalate on companies Windows computers
---

In this post we will explore a simulation of a possible attack that I have spotted in the wild. Given that by company policy I am not allowed to alter the original PCs, this will be a simulated environment using VMs recreated as loyally as possible to the original golden image.

## Pre-requisites
- Being able to control the network's DHCP
  - This can be achieved in multiple ways in reality, but the way I'll do it is by bridging network interfaces and disconnecting the "wifi"
  - An example of more "stealthy" attack would be to host a wifi network
- Having a DNS server (possibly on the same network)
- [pywsus](https://github.com/GoSecure/pywsus)
- [Sysinternals](https://learn.microsoft.com/en-us/sysinternals/) or any Microsoft signed executable
