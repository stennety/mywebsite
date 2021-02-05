---
layout: post
title: 'Is there a difference between Data and Information?'
tags: thinking
---

**TL;DR:** Yes.

In the last few posts, I jumped straight into the pitfalls of old school databases. It’s not profound or original material and more practically serves as a history lesson in data systems. I never enjoyed how history was taught at school, looking back I believe it was because I never had any concept of a particular event’s interconnectedness with other events around it in both time and geography. 

Sharing this blog with a few friends, the feedback was more or less _“blog goes over my head but I like the bio”_. That’s no fun. 

This blog is about data systems. To give a flavour of interconnectedness, data systems are the backbone of almost every application used today. They are like the sewage system; undoubtably important but for most, rarely attracts thought. 

**What is a data system?**

A data system answers questions based on information acquired in the past up to the present.

A bank account answers: What is my current balance? What transactions did I make in January?

A social media network answers: How many followers do I have? What is this person’s name?

Data systems don’t just memorise + regurgitate, they combine different bits and pieces of information together to produce answers. For example, your current balance is combines information on all transactions on your account. 

**What bits and pieces do data systems store?** 

A crucial observation is that some information can be derived from other pieces of information. 

Your follower list is derived from the sequence of every follow and unfollow action each and every user has ever made on your profile. 

You can keep tracing information back till eventually you get information that is not derived from anything. This what I’ll call data.

**Data vs information: Is there a difference?**

Unfortunately, the words data and information are often used interchangeably in media or within industry. Don’t accept poor word choice. Data are small block of truth that alone may have no meaning but within the right context and combined in the right way become information that does have meaning. Viewing information as a big object made up of irreducible blocks of data gives clarity on what data are and are not.

Wrapping up, data and information are not the same. Anything you could ever imagine doing with data can be expressed as a function that takes in data and returns answers. So, the crux of everything you can learn about data systems is the following general-purpose definition:

Query = function(all data)
