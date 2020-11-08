---
layout: post
title: Upgrade dotnet core in Raspberry Pi 4 
category: blog
tags: .net dotnet core Raspberry Pi 4 Open Source Debian Linux Raspbian
comments: true
---
# Raspberry Pi 
## Background
I recently installed dotnet core 2.2 in my Raspberry Pi 4, as you can see it in my [previous post](https://helderviana.pt/Install-dotnet-core-in-Raspberry-Pi).
## Context
Now it is time to upgrade it to run the most recent LTS version, that for now is [.NET Core 3.1](https://dotnet.microsoft.com/download/dotnet-core).

![_config.yml]({{ site.baseurl }}/images/upgrade_dotnet_previous_version.PNG)

# Upgrade
## Make a copy of the 2.2 dotnet install
First of all, I start by doing a copy of the previous instal. It was installed under /opt/dotnet, so I create a new folder in /opt/dotnet_2_2_207/ and copy all the content to this new folder.
![_config.yml]({{ site.baseurl }}/images/upgrade_mkdir_folder.PNG)

## Download dotnet core for ARM
Now it is time to download the latest 3.1 version for ARM 32, available on [dotnet core 2.2](https://dotnet.microsoft.com/download/dotnet-core/3.1).
I want to install the Runtime and th SDK, so I need to download both of them.

![_config.yml]({{ site.baseurl }}/images/upgrade_ARM_Versions.png)

### to download the SDK
```bash
wget https://download.visualstudio.microsoft.com/download/pr/d9a0b670-88f8-44ac-a6b1-9020c783c518/8bbec2b438275789bc1dbc95b8f89adf/dotnet-sdk-3.1.109-linux-arm.tar.gz

```
### to dowload the Runtime
``` bash
wget https://download.visualstudio.microsoft.com/download/pr/7c1177f6-feb9-4404-a795-adb77e78b9ab/d3ca4e135e1af71bea28623774f8df27/dotnet-runtime-3.1.9-linux-arm.tar.gz

```
Usually I do this with root user and inside one download folder, that then I can delete the old .tar.gz files but this time I run it with pi user, using the sudo option.
### time to install it
My option is to install it inside one folder accecible by all users, in `/opt/dotnet`, because later I plan to create one technical user, with low level access to run the cron job with the app.
```bash

sudo tar zxf dotnet-runtime-3.1.9-linux-arm.tar.gz -C /opt/dotnet
sudo chmod 777
sudo tar zxf dotnet-sdk-3.1.109-linux-arm.tar.gz  -C /opt/dotnet
```

## check the version
Make sure it is intalled and check the version/info about the dotnet core version installed.
```bash
dotnet --info
```
After run all those steps dotnet core 3.1 was installed and running (for all users) in my Raspberry Pi 4. I use a personal user to my daily work on my PI, and some technical accounts to run some cron tasks, that also run .net core apps.
![_config.yml]({{ site.baseurl }}/images/upgrade_dotnet_version.PNG)


# Some References:
* [my previous post](https://helderviana.pt/Install-dotnet-core-in-Raspberry-Pi/) 
* [dotnet core 3.1](https://dotnet.microsoft.com/download/dotnet-core/3.1) 

