---
title: How to test anything in 5 steps
tags:
  - testing
  - quality
  - process
date: '2022-08-15 00:00:00 +0100'
categories:
  - Testing
redirect_from:
  - /how-to-test-anything-in-5-steps/
---

How to test anything:

1. **Capture** what you know so far and build a model
2. **Review** the model with others, identify what is important
3. **Explore** by running experiments to learn what you don't know
4. **Update** the model based on what you know now
5. **Repeat** this cycle until you stop finding useful information

## Capture

We all build models of the things that we test, these might be mental models we keep in our head, informal models such as mind-maps or more formal models such as state transition diagrams.

Build models that help describe the behaviour of the system you are testing, and capture the information in a way you can easily share and review with others. 

## Review

Reviewing work with others is important for a number of reasons, mainly because by updating it with input from multiple people we can reduce bias from what we know ourselves and get closer to a truth that is useful.

You can use questions get useful feedback on your model, such as:

* What is missing?
* What isn't correct?
* What is important?
* Does this feel right?
* Does this sound right?
* Does it add up?

## Explore

Now you've got an iteration of your model, you have some ideas about how the system should behave so it's time to test those ideas against the current reality of the system.

The goal here is to explore to learn useful information, where to focus is going to depend on your context. Here are some things you might want to learn:

* If reviewers didn't agree, find out how the system behaves now?
* You identified behaviours that are important, do they indeed behave as you expect?

Your model will have gaps, open questions, fill those knowledge gaps with exploration. You can run your exploratory testing in many ways, use your current model as a guide about what is important, and how you think the system should behave.

It's very important you take good notes as you explore, so you can discuss your findings with your team and use the outcome of that conversation to update your model.

## Update

Reflect on what you've learned during this iteration and make sure to update your model based on what you know now. Maybe you found surprises during your exploration, and now you know more, put it in the model.

You will need to make choices as a team if a surprise you find is a bug, or intended behaviour that you haven't modelled yet, so keep them involved as you go.

## Repeat

This process is a cycle, that you can continue to repeat as you continue to test the system.

On each iteration, you will learn more, if you stop learning useful information that your team can use to make better choices, you're done for now.

When the next change comes along, you can build on existing models and create new ones as appropriate. It need not be a single model that you build, use whatever is appropriate for this iteration of the cycle.

## How others test anything

My esteemed colleague [James Thomas](https://twitter.com/qahiccupps) as his own take on how to test anything, these are complementary to what I've said above and less cyclical.

You can read find out more about James's approach:

[https://qahiccupps.blogspot.com/2020/05/how-to-test-anything.html](https://qahiccupps.blogspot.com/2020/05/how-to-test-anything.html "https://qahiccupps.blogspot.com/2020/05/how-to-test-anything.html")

[https://youtu.be/Lj6RjWA-arI](https://youtu.be/Lj6RjWA-arI "https://youtu.be/Lj6RjWA-arI") \[In 3 minutes\]

## Graphical Test Planning

My cyclical approach to testing is based on the **Capture**, **Review** **Update** from Graphical Test Planning (GTP), developed by Hardeep Sharma from Citrix Systems, many years ago.

You can learn a little more about GTP here:  
[https://sites.google.com/site/gtpfortest/](https://sites.google.com/site/gtpfortest/ "https://sites.google.com/site/gtpfortest/")

Graphical Test Planning describes a way to model system behaviour in Structured Relationship Diagrams, and how to write Test Case Diagrams that model how to test single observable behaviours.
