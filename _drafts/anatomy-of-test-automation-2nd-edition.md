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
  path: "/uploads/pexels-karolina-grabowska-7269622.jpg"
  height: 1000
  width: "420"

---
A year or so ago, I had some ideas about the broader topic of Automation, and how it takes more than a sequence of steps with some assertions to make it successful. My original post can be found here: [https://dev.to/dowenb/anatomy-of-test-automation-e9o](https://dev.to/dowenb/anatomy-of-test-automation-e9o "https://dev.to/dowenb/anatomy-of-test-automation-e9o")

Rather then bring the original post over to my personal blog as is, I'm going to attempt to update it and make it easier to consume.

## System under test and supporting environment

In the beginning, you need the correct version of the System Under Test.

This maybe as simple as taking the latest build of a single isolated service. More likely, this will involve getting matching versions of multiple services that work together to form a system.

This task alone may not be trivial, more than likely it can be automated with help of a Continuous Integration (CI) platform. Something like Jenkins that can be configured to kick off builds when you commit changes to source control.

There are many useful technologies you can use to help you here, such as Docker, to spin up environments built of one or many components.

There are a few different approaches you can take to test environments, these generally fall into shared or isolated. Each has different advantages, let's take a look.

### Use shared, long lived environments

Shared environments are useful because they can often support being used by multiple people at once. This means the whole team, or even multiple teams can be looking at the same consistent snapshot of the system, and it's different builds at once. This means you can have a shared experience of the system, and it can avoid the "works on my machine" problems when reproducing issues.

You can also use shared environments to work with external teams or customers, these are sometimes called integration environments and may be abbreviated to int.

Another advantage of such shared, longer lived environments is they may look closer to a production setup, although typically they are scaled down for cost purposes.

The downside of shared environments are:

* Difficult or impossible to isolate test date and shared state
* Requires maintenance if test data nears clearing out or it gets corrupt
* Needs updating with latest versions as new things get release and when taking a new version this may interrupt testing in progress 

Shared environments that have shared state, e.g databases, are typically sub-optimal for use in automation, but can support exploratory testing.

The cost consideration for long-lived environments, is that depending on hosting they may be costing money while they are not being used. This can be somewhat mitigated, if they can be shutdown automatically outside of hours of use.

### Isolated, on demand environments

Isolated environments that are created on demand, live for only as long as they are needed and are then destroyed offer huge advantages to test automation.

On demand environments that are built as needed, often supported by container technology such as Docker, can consist of multiple services. This maybe a combination of software build by your team, other teams in the company, and supporting services such as Databases, Queuing, Proxies, Load balancers, and mocks of third party systems.

On demand environments may also be used for exploratory testing, where experiments can be run against a configured set of versions for the various components of the system under test.

The cost consideration for isolated environments, is that each new environment adds  cost, because all parts of the system under test and supporting services are spun up together. This is why typically, isolated environments are created on-demand and are short lived. They serve their purpose, and are then removed. This can be very cost effective overall.

One disadvantage of on-demand environments is the extra time it takes to spin up, this can add minutes to your automation run, before tests have even started.

### Isolated or Shared Environments?

The two are not mutually exclusive, you could have isolated environments for automation, and shared environments to aid exploration. It really depends if you are optimising for cost, freedom of configuration, isolation or speed.

However you approach it, getting the environment and setup for the system under test right is not a trivial task, and requires investment. If you have infrastructure, ops or devops type folk at work, make use of them. If you're really lucky, you might have a platform engineering team that can set-up some of this magic for you.

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

Cover Photo by [Karolina Grabowska](https://www.pexels.com/photo/models-of-organs-7269622/)