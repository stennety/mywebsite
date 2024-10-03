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

## Setup
To perform this attack I will use a Kali machine with the following packages installed from `apt`: `isc-dhcp-server` and `dnsmasq` (technically dnsmasq also has a DHCP server) and the git clone'd pywsus
The target machine is a Windows 10 machine. We normally are only given a AD User without access to the machine's administration.

We want the two machines to be in the same network, either by having one common "internet-less" connection or, say in a more realistic scenario, by being in the same wifi (and maybe guessing the often weak admin password for the router). Normally this attack is performed using [bettercap](https://github.com/bettercap/bettercap) but in this case I decided to go for a different route as I am not sure how easy it is to get into the same subnet in the company environment (and I didn't want to try and upset the IT departent (again)).

### dhcp
We will configure the attack box on IP `192.168.222.1` as the gateway, dhcp server and dns server (and later on the wsus server too).
The subnet will be `192.168.222.0/24` and we will let the Windows client pick any IP

Edit `/etc/dhcp/dhcpd.conf`:

```
subnet 192.168.222.0 netmask 255.255.255.0 {
  interface eth1;
  range 192.168.222.10 192.168.222.50;
  option subnet-mask 255.255.255.0;
  option routers 192.168.222.1;
  option domain-name-servers 192.168.222.1, 192.168.222.10;
  option domain-name "swag.com";
}
```


Edit `/etc/default/isc-dhcp-server`:

```
# Edit with the interface that shares the connection with the Windows machine
INTERFACESv4="eth1"
INTERFACESv6=""
```

### dns
We modify `/etc/dnsmasq.conf` as follows:

```
domain-needed
listen-address=127.0.0.1
listen-address=192.168.222.1
bind-interfaces

address=/wsusserver.domain.internal/192.168.222.1
```
