---
post_title: 'OpenSettlersII #1'
author: dreat
layout: post
published: true
post_date: 2017-03-23 07:00:25
tags: [archived]
---
Hello and welcome for a short update!

<a href="https://github.com/Dreat/OpenSettlersII/commit/362fb27af3fe41da3f0d3da5c09eef184f256b56">Here's a commit to look at!</a>

There's not much and it's not very nice code. But it's something, right?

I decided to postpone Settlers II itself as I need transport layer. I decided ZMTP is the best one for me (why is the topic on the other blogpost incoming!) so I started doing something basic with it. According to ZMTP 3.1 specs first octet (8 bits) follows this convention:
<ul>
 	<li>bits 7-3 are reserved for future use and are 0</li>
 	<li>bit 2 indicates if frame is message (0) or command (1)</li>
 	<li>bit 1 indicates if frame is long(1) or short(0)</li>
 	<li>bit 0 indicates if there are more frames (1) after this one or not (0). For command it's always 0.</li>
</ul>
Now for some clarification. "Bit 0" means "right-most bit". Short message has body of 0 to 255 octets. Long message has body of 0 to 2^63 - 1 octets.

Next we have size field - it's one or eight octets, depending on LONG flag. What's important that size doesn't include flags and itself - so empty frame has a size of 0 even if it has flags and size set.

Lastly we get SIZE octets of body.

In the commit we have simple encode/decode for frame with SIZE = 1, LONG = false. There's a difference between Command and Message.

I am sure that "reserved" is redundant and code itself is not something clean and nice. But it's a little start that I will continue working on and either refactor or throw it away.

Bytes are represented in Elixir as &lt;&lt;values&gt;&gt;. It's quite useful to get working, but we can get better than I got here.

As for functional language specific stuff, please take a look at multiple definitions of private method decode_flags. It's the pattern matching on functions (yup, can do it better here) - elixir will look for matching function and will call it. It's simple and quite powerful feature.

In the next commit(s) and post I will make those encode/decode functions more general to be able to work on all sized frames. And hopefully more ;)
