---
layout: "post"
title: "Advanced Application Configuration"
---

In the past I described how basic application configuration can be done in different ways (see [Split configuration and code](/2015/08/17/split-configuration-and-code.html)). Environment variables are nowdays the way to go, but they also have some constrains. I will describe them and show some additional concepts which can't/shouldn't replace environment variables completely, but can complement them if needed.

<!--more-->

## The constrains of environment variables

* Application instances must be restarted: Of course, in hosted environments like AWS and Heroku the hosting service care about that, but also if it's not needed to do it manually, there are some constrains resulting in this. The application needs to have multiple instances to be able to restart in rotation (which needs some time) or needs to have a downtime
* Sharing: Environment variables are managed on application base. Sharing them between different applications is not possible. To be able to sharing is especially useful for secrets needing for encryption/decryption
* No differenciation between unsensible configs and passwords/secrets. All of them are visible as text for people having access to the environment variables
