---
post_title: Introduction to integration
author: dreat
layout: post
published: true
post_date: 2017-03-17 07:00:26
tags: [archived, integration]
categories: [theory, old_blog]
---
I started to get more into integration and integration patterns. There are few reasons:
<ul>
 	<li>Open Settlers II will be created with integration with possible UI integration in mind</li>
 	<li>It will be helpful in my daily job</li>
 	<li>I feel that it's an important topic in software engineering</li>
</ul>
Having this set up, let's briefly talk about some integration methods.
<h4>File transfer</h4>
We want two (or more) applications to exchange data. We can use simplest solution - write it to file for others to read. (Almost?) every language non-esoteric lanuage has some file read/write function built in. It is also easy to do no matter what environment you're working with. Coupling is not so tight as application devs can (should?) agree on common file format(s) to work with. Changes in code won't change the communication as long as output file is the same. With json it's easier than ever. Even with third party apps it's still trivial to consume messages from software we don't have influence on.

There are also some downsides, too. There is a lot of work with deciding on file structure, file processing. Not too mention storage place, naming conventions, delivering file (if one app doesn't have rights to output location of other), times of reading/writing (and what will happen if one reads while the other writes). But it all is nothing compared to one big problem. Changes propagate slowly (one system can produce file overnight, after "collection" of other). Desynchronization is common and it's easy for corrupted data be spread before any validation (if it's even possible).
<h4>Shared database</h4>
Shared database is a remedy for the synchronization problem. All data is in one central database, so information propagates instantly. Databases also have transaction mechanism to prevent some reading/writing-while-writing errors. You also don't need to worry about different file formats.

But it also comes with a price. It's difficult to design a shared database. Usually tables are designed to fit different applications and are a pain to work with. Worse if we're talking enterprise level solutions and some critial app - its needs will be put higher, making work for others harder. After creating database design there's a tendency to leave it as it is - changes can be hard to follow. Another problem is third-party software. It will usually work with its own design and it may change with newer verions. Database itself can become a perfomance bottleneck
<h4>Remote Procedure Invocation</h4>
Sometimes sharing data is not enough, because data changes may require actions in different applications. Think changing address at goverment service - there are a lot of adustments and documents to be generated. Apps maintain integrity of data it owns. It also can modify it without affecting other appliactions. Multiple interfaces to CRUD data can be created (e.g. few methods to update data, depending on caller), which can prevent semantic dissonance and enforces encapsulation.

It may loosen the coupling, but it's still quite tight. In particular doing things in particular order can lead to muddy mess. While developers know how to write procedures (it's what we do all the time, right?) and it may seem like a good thing it's actually not so good. It's easy to forget that we're not calling local procedure and that it will take more time or can fail due to multiple reasons. Due to this thinking also quite tight coupling arises (as stated before).

As always, there's always a tradeoff. But do we have the best approach here? Or can we do even better? I'll address these questions in <a href="https://dreat.info/2017-03-26-integration-series-messaging/">the next post in series</a>.
