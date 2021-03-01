---
layout: post
title: 'Dissection'
tags: implementation
---

[www.whatprinted.com](https://www.whatprinted.com) is a web app that increases transparency of the [Swaption](https://en.wikipedia.org/wiki/Swaption) market. 
For a range of currencies, it allows users view options that expire today. 

It’s taken me the best part of 3 weeks to get this site running. 
In that time, the database system gone through major overhauls. Here’s the tech stack at the time of writing:

* Python
* Apache Thrift
* Google App Engine
* MongoDB

And here’s how the stack fits into the system’s architecture.

High level:
![High Level Architecture](/images/blog_02_2021/IMG_20210227_124923_242_2.jpg)

Low level:
![Low Level Architecture](/images/blog_02_2021/IMG_20210227_125545_781_2.jpg)

Where is the Computational load?
![Computational Load Distribution](/images/blog_02_2021/IMG_20210227_125859_176_2.jpg)

Continuing our search for GOAT status systems, I’ll dissect the hell out of the site with respect to the [Tom Brady data system principles](https://www.neilchandarana.com/tom-brady-data-system/). 

...Probably not as fun as dissecting a rat, but more fun than me explaining what a swaption is. 
