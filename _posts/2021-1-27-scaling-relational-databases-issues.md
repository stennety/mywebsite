---
layout: post
title: "Mo' data, mo' problems"
tags: relationaldatabase
---

Neil’s notes:
* Bugs inevitably make it to production code
* Fault-tolerance might be more important than I initially thought
* Complexity comes in more than one form; setting up a system + operating it + ?

_“I used to build cool features for customers. Now I’m spending all my time dealing with problems reading and writing data”._

As the application becomes more and more popular, you keep having to re-shard the database into more and more shards to keep up with the write load. Each re-shard, gets more and more painful because there’s so many more shards + active workers + config changes to co-ordinate. 

You forget to update the config file and that causes pageview increments to be written to the wrong shards. You have to write a one-off script to manually comb through the data and fix the incorrect increments.

Eventually, there are so many shards across so many servers that occasionally the disk on one of your servers goes bad. While that machine is down, the data on its shard are unavailable to your application. You do a couple things to address this:

* You set a pending queue to divert increments for an unavailable shard. That pending queue flushes every 5 minutes. 
* You backup each shard without write ability. Users can now still use the application when the master shard goes down. 

Job done? Not quite.

While working on your queue/worker code, you notice you accidently deployed a bug that increments pageview count by 3 instead of by 1. There is no way of knowing which data got corrupted so your backups don’t help.

After all your efforts to make the system tolerant to machine faults and scalable, there is still no resilience to human faults. 

Unfortunately, as the system complexity increases the fault probability increases. On top of that, additional work is pushed to you both in operating the database and developing the application code.
