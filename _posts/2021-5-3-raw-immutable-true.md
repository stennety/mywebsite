---
layout: post
title: 'D1.2 - raw, immutable, true'
tags: implementation
---

Raw. Immutable. Eternally true.

Here’s how [www.whatprinted.com](https://www.whatprinted.com)’s master dataset performs along these dimensions. 

**Rawness verdict: 6/7 - Almost raw.**

WhatPrinted is about a single financial product – swaptions. The regulatory data source contained entries on multiple 
products. Therefore, a single pass was made on the data source to ignore non-swaption products. The structure of the 
data source was otherwise maintained. 

Why does rawness matter? The more processing you do before storage, the more implicit restrictions you make on the 
queries you are able to make on the data set. Raw = flexible. At the cost of storage space. I’ll discuss that trade-off 
at some point in the future. 

![rawness of data](/images/blog_05_2021/rawness_v_questions.png)

Actually this might look more like exponential decay that linear restriction on the set of accessible questions the 
dataset could answer.

A corollary of this is that if you know questions you require of the dataset apriori, then you should process the data 
in a way that will optimise space for your needs.  The key point is that you only get one shot to do this well since 
the master dataset is the first point of storage for the service.

**Immutability verdict: 7/7 - Immutable.**

Never update, never delete. 

It’s pretty obvious why immutability is desirable – fault tolerance and simplicity (in operations and in storage). 
A consequence of storing the evolution of a single record is an increased storage requirement. In our service, 
a single record is a specific trade. The trade evolution could only consist of an amendment, cancellation or 
termination update. Once cancelled or terminated the same trade id is unlikely to be revived. Overall, I expect the 
number of states of a particular record to be between 1 and 3, rarely hitting 4-6. Relatively low so I don't care too
about the additional storage required by implementing immutability.

**Eternal truth: 7/7 – once true, always true.**

Timestamped data entries ensure that if a piece of data was once true at a given time, that particular data point still
 reflects the truth at that time even if the state of the data point has been updated since.

So there we have it. Once trades enter the master dataset, they are processed but minimally with a filter.
They are timestamped and written but never updated or deleted. And always reflect the true state of the trade at any
given point in time.

Next, I'll formalise this into what is known as a 
[fact-based data model](https://isaaccomputerscience.org/concepts/data_big_fact_based) 
(<- pretty good description of what is to come).

