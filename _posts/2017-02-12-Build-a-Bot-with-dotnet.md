---
layout: post
title: Build a Bot with .Net
category: blog
tags: .net dotnet c# csharp development bot machine api rest
comments: true
---

This is my first experience building a bot and it happened by chance and as proof of concept for future applications.
At this moment my language of choice is <b>C#</b> and as such I went looking for some framework that I could use in .Net I ended up by comparing the [Microsoft Bot Famework](https://dev.botframework.com/), still in preview, but I decided to try and download the template for visualstudio. 
After installing the template I created a new project and then I downloaded the Emulator to be able to test it. In Visual Studio I could run an http RESTfull api service with a couple of methods available to be used by the emulator.
<br />
Then I started to build the application logic according to the MVC methodology and a couple of api integrations with services to query the Weather and to query Tech Jobs and Thech Meetings in Portugal (yep the .pt tdl is for Portugal) and to get Bitcoin exchange stocks. It has some logic stored in instructions on the DataBase, that can be can be easily configured<br />
It is not so fancy as it looks like when I say <i>Bot</i> but it is a starting point to start working with bots. For now this bot is not an AI experience (yet) but it could be in the future.<br />
After that I hosted it in an Azere app services, then I configured the bot to be used by web applications and Skype, since then I have been using it on my skype and doing several tests.


![_config.yml]({{ site.baseurl }}/images/bot_webportal.png)
