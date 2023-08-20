---
layout: post
title: Successful collaborative testing sessions
date: 2023-08-19T23:00:00.000Z
draft: false
image: /uploads/pexels-canva-studio-3153201.jpg
categories: Testing
tags:
  - collaboration
  - pair
  - ensemble
---

In my recent experience, I've found a few things that help set up a successful collaborative testing session.

I've used these to collaborate with members of my team, across multiple disciplines from Product and Data, to Software Developer, for context I'm the only software tester on my team, but not the only one doing testing.

I've also used these techniques when setting up cross-team sessions, including even broader disciplines such as medical knowledge, quality, and safety.

## Agree on the mission

Setting up the scope for a session is even more important when working with others. The trick is finding the right scope, one that narrows your focus so you don't get lost while giving you enough freedom to explore.

I often follow the Test Charter format, from Explore It! (https://www.oreilly.com/library/view/explore-it/9781941222584/) by Elisabeth Hendrickson (https://www.linkedin.com/in/testobsessed/):

Explore \<area> using \<resources> to discover \<information>

What I have found useful, is getting ideas from the person or group I will be collaborating with, and then formatting it into a charter and sharing it back, making adjustments until we agree.

This usually only takes a few minutes, and if we come up with multiple we can also set up more sessions. I found this works better than trying to coach people to write in the charter format, at least until people have done a few sessions and get used to the concept.

## Make time and space

How long it takes to do a valuable session of testing varies depending on the group and the work, typically I've found 45 to 90 mins is a good range.

Any more than 90 mins and I would highly recommend taking a break and splitting up into multiple sessions.

Make sure to block time in calendars, and pick a time everyone can comfortably make, when working across time zones beware of lunchtime.

If you're lucky enough to be co-located in an office, make sure to book an appropriate working space and give people time to come along, and set up. Usually, either one screen, keyboard and mouse, or a screen share when remote, works best.

## Bring together the right people

Small groups work well, think 2-5 people. Try out different testing sessions with different mixes of people, to get a broader and more devise view of the software, you might be surprised by the things you find that you might have missed on your own.

People I often invite to testing sessions, and why:

1\. The developers who worked on the feature. I find involving them in the testing gives a much shorter feedback cycle, and they learn things to check for themselves in the future. I also learn a lot from them about the software and they tend to be great at configuring it to do useful things, like extra logging.

2\. Domain specialists, in my case this often means Medical Quality, obviously this is specific to my domain, and your specialists might be different.

3\. Open invite to my whole team. Sometimes I simply book a slot in our team calendar for testing a feature and invite the whole team as optional attendees. The great thing about this is, everyone feels included, and anyone who turns up is self-selected, and invested in joining in.

4\. Product Manager. I find this one especially useful when I'm trying to discover if a flow or scenario has sufficiently low friction from a user-facing point of view. If my Product Manager is surprised by a flow, there is probably a missing story and we can raise it there and then.

5\. Other, related, teams. I find it very useful to test with other teams that are responsible for shared components or might be impacted by our team's work. In my context, another team is primarily responsible for our Mobile App, which we contribute new features to.

Again, I don't invite everyone to every session, but rather I try and guess who might be useful, and interested. Try not to limit yourself, rather hold more sessions and invite more people as an experiment, until you find what works well. Mixing things up to bring in fresh eyes can also be useful, there is no need to stick to the same group each time.

## Setup the software

In my context, typically either I run the software that is being tested, or I invite one of the developers who is joining the session to run it.

For me, this usually requires some upfront work, to pull the right branch, build the right version and start the right complementary docker compose.

If you can, give yourself time before the session to get things up and running and document your configuration. This will save you time, so you can focus on your mission.

If you're using a shared environment, or someone else will be running things locally, make sure they have time before the session to set things up and agree on what versions you will be testing against.

A final tip, make sure to turn on whatever level of logging you need, and remember to load up tools that can help you observe and manipulate the software and the environment it's running in. This could include an HTTP client, a proxy tool, or a Database Client.

## Take notes

I find it challenging to facilitate a session, drive the software and take all the notes myself, so I like to ask the group to help me out.

A favor of "multi-player" text editors, such as confluence, in a pinch a Google Doc would work as well. If needed, you can tidy up the notes and throw them in an official tool later.

You probably don't need to write down every thought, and everything you do. You will want to capture enough detail of the steps you take, your expectations, and your observations to make meaningful conclusions.

I like to pull out the key items covered, findings, and action points to a summary at the top of the notes. This makes them more management friendly and supports debriefing with anyone in the team who wasn't involved.

## Choose your own adventure

At regular intervals during the session, I find it useful to take a moment to re-state the mission and choose what to do next.

Use what you've learned so far, to help you come up with a few ideas for what to do next, and together pick a path and follow it.

I find it very useful to use these short pauses to bring in anyone who hasn't spoken for a while.

Keep picking new paths until your time-box is up. If there is more to learn, plan another session.

## Group reflection

Making time, about 5-10 minutes, at the end of the session to reflect is a great way to practice continuous improvement.

When working with groups who were not traditional software testers, I found writing down the reflections very powerful.

Across a few months of working with a group of talented Medical Knowledge Engineers (Doctors who code), I picked up on some themes:

* Working collaboratively was a lot of fun, they liked the social aspect
* Bringing multiple points of view reduced potential biases from testing alone
* They learned a lot from observing how others test
* There is huge value in thinking aloud as we tested
* The opportunity for domain knowledge sharing was appreciated and valuable

## Go forth, and test together!

In summary, I strongly encourage you to go forth and form some groups and practice collaborative testing.

* Agree on a mission
* Invite 2-5 people
* Setup the software
* Take notes
* Share an adventure
* Reflect on the experience

## Other resources

Not for the first time, I'm going to call out [Lisi Hocke's](https://www.linkedin.com/in/lisihocke/) excellent list of collaboration resources, especially the section on working in an Ensemble.

[https://www.lisihocke.com/p/collaboration.html#ensemble](https://www.lisihocke.com/p/collaboration.html#ensemble)

Explore It? Explore It! by Elisabeth Hendrickson

[https://youtu.be/9FKY1Is0lgs](https://youtu.be/9FKY1Is0lgs) \[Video]

[https://www.oreilly.com/library/view/explore-it/9781941222584/](https://www.oreilly.com/library/view/explore-it/9781941222584/) \[Book]

[Hero image, Photo by Canva Studio](https://www.pexels.com/photo/man-in-black-crew-neck-t-shirt-sitting-beside-woman-in-gray-crew-neck-t-shirt-3153201/)
