---
layout: post
title: What makes up a software stack
date: 2023-07-30T23:00:00.000Z
categories: Testing
tags:
  - technical
  - full-stack-testing
---

I like to think of a software stack, also referred to as a technology stack, as the different layers of technology that build on top of eachother in order to make a functioning system.

What goes into that software stack depends on a great many things, there are some frequently seen, common layers and some more exotic ones depending on the architecture of your system and how it has evolved over time.

## Classic Web Development Stacks

When I started learning about web development, in the early 2000's if you must know, the classic stack was LAMP. LAMP stands for Linux, Apache, MySQL and PHP, using this collection of technologies you had Linux as the foundational operating system, Apache as the webserver, MySQL as the persistence in the form of a relational database. Finally PHP would combine with HTML, CSS and JavaScript to provide both backend business logic, the connection to the database and frontend presentation to the user.

And if you were to test an application running on a classic LAMP stack, you would need an environment where you could deploy these technologies. You also need to choose how deep to go, and what risks you might want to test for at in each part of the stack.

It would be totally understandable to stop short of testing the Linux OS itself, however I can think of more than one time a misconfigured or out of date Linux installation has cause a combability issue or security bug.

## Modern Web Development Stacks

While the classic LAMP stack still exists, there is a very good chance you are developing or testing a more modern wizz-bang software application that uses a newer stack. MERN stands for MongoDB, Express.js, React and Node.js.

## Common themes

## Map out the stack for your software under test

## Where to learn more

A bunch of links to learn more about software stacks:

* [https://www.imaginarycloud.com/blog/tech-stack-software-development/](https://www.imaginarycloud.com/blog/tech-stack-software-development/ "Top 10 tech stacks for software development in 2023")
