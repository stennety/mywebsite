---
layout: post
title: What makes up a software stack
date: '2023-07-28T23:00:00.000Z'
categories: Testing
tags:
  - technical
  - full-stack-testing
image: /uploads/pexels-christina-petsos-11753327.jpg
---


I like to think of a software stack, also referred to as a technology stack, as the different layers of technology that build on top of eachother in order to make a functioning system.

What goes into that software stack depends on a great many things, there are some frequently seen, common layers and some more exotic ones depending on the architecture of your system and how it has evolved over time.

## Classic Web Development Stacks

When I started learning about web development, in the early 2000's if you must know, the classic stack was LAMP. LAMP stands for [Linux](https://www.linux.org/), [Apache](https://httpd.apache.org/), [MySQL](https://www.mysql.com/) and [PHP](https://www.php.net/), using this collection of technologies you had Linux as the foundational operating system, Apache as the webserver, MySQL as the persistence in the form of a relational database. Finally PHP would combine with HTML, CSS and JavaScript to provide both backend business logic, the connection to the database and frontend presentation to the user.

And if you were to test an application running on a classic LAMP stack, you would need an environment where you could deploy these technologies. You also need to choose how deep to go, and what risks you might want to test for at in each part of the stack.

It would be totally understandable to stop short of testing the Linux OS itself, however I can think of more than one time a misconfigured or out of date Linux installation has cause a compatibility issue or security bug.

## Modern Web Development Stacks

While the classic LAMP stack still exists, there is a very good chance you are developing or testing a more modern wizz-bang software application that uses a newer stack. MERN stands for [MongoDB](https://www.mongodb.com/), [Express.js](https://expressjs.com/), [React ](https://react.dev/)and [Node.js](https://nodejs.org/).

Here we have a NoSQL Document Storage Database, in MongoDB and then a lot of JavaScript. Express.js describes itself as "Fast, unopinionated, minimalist web framework for Node.js", and Node.js is itself a an open-source cross platform JavaScript runtime environment. React is a library for web and native interfaces.

## Beyond web development

Of course, web applications are far from the only software systems out there. Mobile apps bring additional technology to the stack, as do Desktop applications. There are also more exotic or specialised software systems you might get involved testing, like firmware, control software for industrial systems.

There is also software in embedded devices from smart fridges to medical devices, and these may interact with web based backend services, or may operate independently without an internet connection at all. In 2023, no internet, I know right? Madness.

I won't cover all possible stacks here, I probably couldn't if I tried, as rather than looking like clean show-home like system architectures, most systems evolved over time to also include "that old bit nobody remembers how it works", and "that bit that runs on a database from the 80's, bit it still makes money so it won't get replaced unless it dies".

OK, maybe I'm showing both my age and some point from some very specific jobs with that last one, but the point stands that there maybe a mix of stacks across your company, that are somehow stuck together to form the product your systems know and love.

## Common themes

There are some common parts to most software stacks, and while beyond web development there are some differences, key components are shared across almost all software.

### Presentation and user interface

Be it a web page in a browser, an app on your phone or the Point of Sale software on those love em or hate em self-checkout tills, most software has some way to present information to the user and allow some kind of interaction.

This layer is likely one part of the software you test, that you know very well, after all it's the easiest entry point of exploratory testing and it is the bit you can see, hear, touch or maybe shout at (I'm looking at you, voice assistance speakers).

### Business logic, backend and third party services

Not all systems are so clean that all logic is abstracted away from the Presentation layer and into backend services, in fact it's safe to say some business logic will likely sit alongside the UI layer of your application.

Dig a bit deeper, and there is also very likely backend services that embody much more logic. I use services plural, as the majority of systems I've worked on have had more than a single backend service. These backend services are where your system does processing, makes decisions and ships data off to the persistence layer.

Things to watch out for at this layer include business logic, that either supports the frontend or may be hidden from it and had to spot directly. It's also worth identifying third parties you interact with, this will often take place via API calls using HTTP requests, but not always. Examples of third party services are PayPal or Stripe for payment processing or UPS for logistics.

### Persistence

The persistence doesn't only include databases that store documents or structured data, at this layer you can also find other types of storage. For example, filestorage is one way data is persisted in a system, think about where all those images go when you past them into your ticket management system, it probably isn't a database.

In the same way logic can leak into the presentation layer in the UI, the persistence layer is another place logic and rules can live. These might be semantics such as the data types of fields, the encoding and compression of files or a number of other things that will depend on your system.

Many times I've seen errors cause by truncated data in fields that have a data type that simply cannot storage the value the backend tries to put in them, and depending on the configuration and logic at this layer, there maybe no error passed back.

### Operating Environment

All the moving parts that make up your application need somewhere to live, and this operating environment in modern systems if often itself another complex layered system. And can further be broken down, although I'll spare you some detail, you can dig very deep here if you wish.

The foundation of the Operating Environment is the hardware the software runs on, this might be abstracted away for you by a Cloud provider or some in-house system of virtual machines and related orchestration.

The architecture of the computer processors, CPUs, can have a profound impact on what software can run on higher layers of the system. The two major hardware architectures are ARM and x86.

The operating systems running on the hardware can also have a big influence on what software can be run, although a majority of mainstream server software now runs on either Windows or Linux, developing for iOS still has a large dependency on Apple hardware and MacOS software.

On top of the Hardware and the OS, many other dependencies exist that can influence things, these maybe system level versions of runtime environments, such as [Java](https://www.java.com/), [.NET](https://dotnet.microsoft.com/en-us/), [Ruby](https://www.ruby-lang.org/en/) or Node, or tools and libraries that your software expects to be available. And all these need to be kept up to date, with each new version introducing bug fixes, and possible incompatibilities, so this layer has its own challenges for sure.

No discussion of the Operating Environment would be complete, without mentioning containers. [Docker](https://www.docker.com/), [containerd](https://containerd.io/), and the orchestration built on top such as kubernetes, and helm, bring some solutions to the problems above. Dependencies can be managed in an isolated way for each container, so each service can use the correct versions of Java and Node. Of course, this is another thing to learn, configure and manage, and adds it's own complexity.

## Where to learn more

A bunch of links to learn more about software stacks:

* [Top 10 tech stacks for software development in 2023](https://www.imaginarycloud.com/blog/tech-stack-software-development/ "Top 10 tech stacks for software development in 2023")
* [ARM vs x86: What's the difference?](https://www.redhat.com/en/topics/linux/ARM-vs-x86)
* [Xcode, used to build iOS apps on Mac OS](https://developer.apple.com/xcode/)
* [Failing for the Right Reason - a Fresh Look on TDD](https://www.ministryoftesting.com/testbash-talks/64f70bd6?s_id=15416741)
* [Multitier architecture (Wikipedia)](https://en.wikipedia.org/wiki/Multitier_architecture)
* [LAMP software bundle (Wikipedia)](https://en.wikipedia.org/wiki/LAMP_\(software_bundle\))
* [MEAN solution stack (Wikipedia)](https://en.wikipedia.org/wiki/MEAN_\(solution_stack\))
* [MERN Stack Explained](https://www.mongodb.com/mern-stack)

Header image: [Photo by Christina Petsos](https://www.pexels.com/photo/cake-with-colorful-layers-11753327/)
