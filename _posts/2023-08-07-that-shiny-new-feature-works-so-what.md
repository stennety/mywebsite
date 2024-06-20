---
layout: post
title: 'That shiny new feature works, so what?'
date: 2023-08-06T23:00:00.000Z
draft: false
image: /uploads/cube-small.jpg
categories: Quality
tags:
  - quality engineering
  - technical
  - full-stack-testing
---

## What does it mean, to say your feature is complete?

![](</uploads/pexels-bidvine-1249611 (1).jpg>)

In software delivery teams I've worked in, we have often been responsible for parts of products. Sometimes this means we have been responsible for one or more services, and nothing beyond the responsibility of that service. Other times, the team has been responsible for a vertical stripe of functionality that crosses one or more backend services and the frontend that goes with it.

In almost all cases, we haven't been responsible for the whole system at once, the responsibility has been split up across multiple teams in some way. This means there has been times the team I've been in has declared a feature as complete, and then handed it over to another team. And the other way, our team has had to handle features implemented by other teams, that now change the product our services of features operate in.

All this means, that the concept of complete exists within the boundaries of responsibility, and it can mean different things to different people. So, when do we stop testing? When *our bit* is done? When the feature is available to customers? When we start collecting and analysing the first days, week, months worth of tracking data?

I find it very valuable to explore what complete means for the team I'm in, and to communicate this concept of completeness for us, and see how that fits with other teams who work on the same product. Inevitability, releases have gone better when the relationship between the teams has been strong, and we've worked together to avoid a hard hand-off, aka "throwing it over the wall".

## So what does this mean in context of the whole product?

![Hand with golden pen, looking out over multiple question marks on paper. Intended to describe asking a question, what does it mean?](</uploads/pexels-leeloo-thefirst-5428833 (1).jpg> "Photo by Leeloo Thefirst: https://www.pexels.com/photo/question-marks-on-paper-crafts-5428833/")

So, your feature is complete. Time to celebrate, are ship parties still a thing? But wait, does this mean the value has been delivered? I've recently been working in a team that relies on the efforts of another team to release a new version of our mobile app, including all the other features that are going into the release, before users get their hands on our efforts. If they they are prevented from releasing for any reason, tough luck, our changes won't get out yet.

OK so it isn't so bad waiting for another team before our code gets into the hands of customers, typically they ship every 2 weeks. As we share a code base or two, there is some scope of us to support each other, but also to step on each others toes.

Most of this could be considered Developer Experience, so us now take a look at another point of view, from the end user. Does your new wizz-bang feature work sympathetically with the existing features? Does it have the same options for high-contrast colours? Can you print the results, or email them to yourself like you can on the other screens, no? Well this could cause users a headache!

Your feature doesn't live in isolation, so doing a good job means taking into account the wider user experience. Some of this should come out during ideation or design, but it doesn't mean you shouldn't continue to test for it as you develop the feature. Often, implementation drifts from design and the end result might add unintended friction.

## Now what can you do next to make it a success?

![A number of interconnected hands from different people of different colors, to represent teamwork and success](/uploads/pexels-monstera-5384623.jpg "Photo by Monstera: https://www.pexels.com/photo/faceless-multiracial-sport-team-stacking-hands-on-court-5384623/")

Okay, we've looked at some details into why a feature being complete doesn't really mean it's done, done. Now, some thoughts on how we can turn this into a success.

### Identify team dependencies

In the end, it always comes down to people. Build an explicit list not just of the teams, but the people who you depend on, and are dependent on you, to deliver valuable features to the end user. Network with these people, learn their names, learn the goals and priorities of their teams.

Do enough, so that when you need to ask for help, or forgiveness, it feels like it is coming from a respected colleague, who understands their situation. It is amazing how quickly minor problems can be resolved, if you can work well together has humans.

You can also share our the relationships across your team, so you're not leaving everything to one person, and instead sharing the responsibility. This has the added bonus that you can all value the work that goes into building and maintaining relationships with other teams and key people.

### Identify code integrations

Direct dependencies are hopefully more obvious to map out, especially if work has already been done to maintain a system architecture diagram that shows how things hang together.

It can be easy to miss how a change in one feature can impact other parts of the system up and downstream. So you also need to take time to map out more distant dependencies and relationships, and take time to appreciate how new changes will impact things.

### Create cross-team structures

So depending how your organisation is setup, you may have cross-functional teams of Testers or Architects, maybe Designers. They might already spend a lot of effort building relationships and identifying dependencies and relationships, if you're lucky enough to have these people, use them!

It's also possible that there are topics that simply fall through the gaps, and are not covered either by any one team, or collectively by groups of teams. For this, you can setup cross-team structures, you can call these guilds, or virtual teams, or anything else that makes sense for you.

The key thing is, to make space to speak to each other, be that via a chat channel, regular or on-demand meeting, so you remember to focus on the topics that would otherwise be missed.

You can also make sure of structures you might already have on a cross-team, or group level, to discuss upcoming planned work, and see what other teams think about it.

## Summary

* Done for you might not mean done for everyone involved in getting your work in front of users
* Considering the wider context of your teams work, will help you identify blockers to delivering value
* It all comes down to humans, get to know the humans involved in getting your code in front of users

## One more thing

I hope you found this insight interesting, and my suggestions for improvement useful. I'd love to hear about your experiences.

As I sign off, I wanted to share this. A friend at work sent me a link, and it made me chuckle more than a little bit, and it felt very relevant to this blog, so I'm including it here.

[https://youtu.be/y8OnoxKotPQ](https://youtu.be/y8OnoxKotPQ)

Heading [Photo by Pixabay](https://www.pexels.com/photo/colorful-color-play-concentration-54101/)
