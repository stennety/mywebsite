---
title: Anatomy of test automation 2nd Edition
tags:
- devops
- cicd
- infrastructure
- automation
date: 2022-11-01 00:00:00 +0000
categories:
- automation
description: Test automation is about more than code, it takes infrastructure, process
  and strategy
image:
  path: ''
  height: 
  width: ''

---

With the rise of low-code and no-code solutions, I've been thinking about the problem they are trying to solve.

This lead me to think wider about the parts of Testing that can be supported by tools and automation.

## System under test

In the begining, you need the correct version of the System Under Test.

This maybe as simple as taking the latest build of a single isolated service.

More likely, this will involve getting matching versions of multiple services that work together to form a system.

This task alone may not be trivial, more then likely it can be automated with help of a Continuous Integration (CI) platform.

Something like Jenkins that can be configured to kick off builds when you commit changes to source control.

All CI systems I know of require at least minimal code, or at least a configuration file of some sort that gives instructions on how to build the Software.

Likely this is a wider concern then Test Automation, you won't be the only one who wants software built.

But I've worked in consultancies who still build the odd thing by hand and FTP it to a server.

So if you don't already have a slick answer for this, it's a barrier to automation straight away.

## The supporting environment

The SUT will seldom live on it's own, unsupported by dependencies. This might e mean having the right Node or Java versions available.

It could also mean setting up:

* Databases
* Storage
* Queues
* Proxies
* Load balancers
* Third party API or appropriate mocks

Each of these may also need special configuration or base data seeding that isn't specific to any given scenario.

If you are lucky you can get some or all of your dependencies deployed using some type of automation. Maybe Docker images that can be Deployed by your CI System.

Living the dream. More automation, definitely some code, hopefully some Infrastructure as code.

Failing that, you might have some static servers. hopefully managed by a friendly Ops engineer. Otherwise another job for you.

Again, if this isn't already slick and automated, another barrier to entry.

## Test scenario

Okay, the big one. Let's assume we overcame all the hurdles above. Now let's break down our Test cases.

### Prerequisites

In addition to all the setup you've done to get this far you might still need a big more. Maybe some users with appropriate access.

### Test data

If your inputs and outputs are static, this might be trivial.

For me, I often work with non trivial test data that requires some level of templating.

I often need to make sure dates represent today, even if I wrote the test and captured the data months ago.

In some cases test data can be generated automatically using libraries like faker. I know some tools, like Mockoon include Faker out the box.

### System state (Given)

Now your going to want to get your system into the starting state.

Some examples:

* User is logged in
* A the right page is loaded
* An entry doesn't already exist for new TODO item you are about to create

This is something your automation framework, code or otherwise really should handle.

Finally, something we can recognise as Test Automation.

### Action (When)

This is the core of the test. Stimulating the users action or a sequence of multiple actions that we expect to make some change to the system state.

Examples:

* User clicks a button
* API call is made
* File is changed

### Assertion of expected result (Then)

This is where most of the debate comes in about Automated Checks and Human testing. Ignoring any Ai for a moment.

This is where we have a coded assertion. I don't mean we need to be using a programming language, but we need to have an unambiguous way to choose if the actual results we got are what we expect.

If they match our coded expectations the test passed, otherwise it falls.

While we can make test smart to an extent and we can look for shapes and ranges, ultimately we can only assert on what we can expect.

This can definitely be done by any automation framework, whatever the language, low-code or no-code.

If we got this far we are winning, provided of course we did our Test Analysis right and we are checking for useful things.

## Logging and reporting

Analysing logs and making reports can definitely be fully or partially Automated.

This might take the form of some Console output that can be captured by your CI System and be linked to a build. It could also take the form of a HTML report, complete with graphs, screenshots, API responses to even video recording.

What you will probably miss is the contextual logging. The logs from the dependencies and more distant parts of your SUT. This can also be captured and logged, but takes a fair amount more thought.

## Tools and supporting script's

Of course this maximalist description describes pretty much an end to end or system integration test.

As I'm sure expert's like Mark Winteringham, Richard Bradshaw and Alan Richardson would tell you, you can get great value from Automation and Tools to support your testing way short of an end to end test.

I've done this myself on plenty of occasions by creating tools to capture or generate test data, of by mocking APIs to support my Exploratory Testing.

## Conclusion final thoughts

If you were not convinced already that to succeed, an automation strategy need support and buy in from many people in various roles, I hope you are now a convert.

In my opinion, and I am making some assumptions, low-code or no code only attempts to solve.

In fact, I would go further and say Test Automation Frameworks only try and solve part of the problem. And that's OK.

Building software is a team game, and Software Quality even more so.