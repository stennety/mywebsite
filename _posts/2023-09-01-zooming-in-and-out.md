---
layout: post
title: Zooming in and out
date: 2023-09-04T23:00:00.000Z
draft: false
categories: Testing
tags:
  - models
  - systems analysis
  - systems thinking
image: /uploads/pexels-ethan-sees-2853432.jpg
---

Over my career in Software Testing, I've had the pleasure to analyze and model a lot of systems. Some of them have had tons of formal architecture models and others have had little more than a few epics and user stories held together by smart engineers and sticky tape.

One of the things I've found useful over that time is zooming in and zooming out. That is, thinking about each part of the system to a different depth, and drawing different scopes that include more or less of the bigger picture.

## Zooming in

Software systems are made up of many moving parts, and each one of those parts can have its own complications. Exploring the depth of each component can help you find quality issues and areas for improvement that bring benefits across the whole platform.

### How deep can you go?

There are many ways you can go deeper into a single service that is part of a bigger system. Depending on the context, you could:

* Investigate calls to an API, dig into every possible header and body option, and follow each path until it either computes and outputs, fetches something from a database, or writes back to one.
* Identify each 3rd party API the service calls, what information are you providing to the API and what is returned? Read the docs for the 3rd party API, are there options you are not using?
* Find the key internal methods of the system, can you follow the logic? Try reading the unit tests, or even modify the unit tests to explore even further.
* Do the Dev's have a profiling tool, so you can look at exactly where processing time and memory are spent?
  From a modeling point of view, drawing the major behaviors, inputs, outputs, and dependencies can be useful. Pay attention to interactions with other services, databases, and the use of third-party libraries or imported dependencies.
* Finally, dig into configurations, and environment variables. Identify what configuration is used in different deployments, like local, dev, vs production.

### Questions you can ask

* How can we configure the service to run with the highest level of logging, say debug or trace?
* What dependencies, either from third parties or other teams, does the service rely on?
* Can you trigger failure modes, and observe what would happen if dependent services were unavailable or invalid input was provided?
* What would happen if I/O (reads and writes) didn't respond in time? This could be databases, file systems, or calls to other services.

## Zooming out

While many small parts make the whole, how they are connected together, the purpose, scope, and scale of the wider system is critically important. Often, it's easy to miss the bigger picture when your team is focused on contributing an individual service. You might want to pair up with systems architects, testers, and software developers from other teams to model and test across team boundaries.

While traditionally, centralized test teams or systems integration teams might have handled this task, now teams seem hyper-focused on avoiding the need to interact with the whole system. While mitigating work, like contract tests, can help individual integrations, having a wide systems overview at some point can bring benefits to overall quality.

### How wide to go

This is where context really matters, even more than when zooming in. In order to zoom out the furthest you can go, you might need to go beyond your comfort zone.

I've taken the time to look at parts of the system built and operated by other teams, 3rd party services, and even our customer's systems. It has brought benefits from gaining a greater understanding than I could ever have had if I had self-limited myself to the systems my team works on directly.
So, how far can you?

* Gather any system documentation you can find, you will likely need to speak with other development teams, and maybe other functions like operations, support, or customer success.
* Pair up with a team that handles one of the other services, that your teams work interacts with. Together, you might find out-of-date documentation, missing knowledge, and concepts that have been misunderstood.
* Think about parts, or collections of system functions or services that work together to accomplish a wider goal, what is that goal? Are there gaps in testing for it?
* Look at system logging, can you trace when one system hands off to another? What about if the customer's data goes to, or comes from a third party, can you see it in the logs?
* How much of the wider system is available in your testing environments? What about running locally?
* Do you have system-level automation tests that cover key flows, are they up to date? What do they actually cover?
* Are there exit points in your system, where you or your users interact with the real world? e.g if your system delivers flowers, do they arrive fresh? How quickly would you know if the delivery was missed, and the poor flowers were degrading in quality sat in a sorting office?

### Questions you can ask

* What patterns and tools are you using to communicate between different parts of your system? Is it all HTTP requests, or are there events and message queues?
* What marketing tools and middleware are you using? How are these integrated into your systems, and who is responsible for adding or updating events when you introduce new features?
* What analytics and data tracking are you using, both for observability intro production performance and to understand how your users use the system? Who is implementing these events, and who is analyzing the results? Can you use the event data to make a judgment on quality? Or maybe understand if an experiment is working?
* Are there multiple services that rely on common dependencies, say a version of Java or Node? are they all equally up to date, or is there a mix of versions being used? Could this be a problem?
* What combination of versions of each part of the system have been tested together? Has the combination that hits production next been fully tested as it will be deployed?\* What does the Long Term Support look like for the versions of your dependencies look like?\* Hosted database systems such as MongoDB, or infrastructure elements like Kubernetes have ever-increasing minimum versions, when are the current versions end of life?
* What maintenance work is planned for the underlying infrastructure? Is that even under your control?
* Who is responsible for handling service arrangements, contracts, payments etc with your providers? If the production Database goes down, do you know who to call? And do THEY know who to escalate it to?
