---
ID: 86
post_title: 'OpenSettlersII #2'
author: dreat
post_excerpt: ""
layout: post
published: true
post_date: 2017-04-02 21:05:54
---
<a href="https://github.com/Dreat/OpenSettlersII/commit/086302655af2e017161bce6077eacfbf36e029bb">Here's a commit for you to look at!</a>

I didn't do much this week but progess is progress :)

I added the support for long frames. According documentation, long frame is defined by flag (Bit 1, "second one from right" must be 1). If the flag is set, size will be 8 octets, and body will be size octets. (So if size is 256, body will be 256 octets).

First lets look at tests. First change you can see is that I removed "reserved" from flags as it is not needed at all and obscured the data.
Next I renamed "command" key to "type" - as it reflects better what it is - it indicated the type of frame - if it is a command or message.
Next change (in decode) is that body is still in binary (inside &lt;&lt; &gt;&gt;). I guess I will work on that later, but was needed in some changes.
I added 2 tests to correctly decode long frames, for both command and message. What's important is :: size(64). It indicates the size of binary element. If not specified it will be default (8). What's also important (and quite logical) size have to be divisible by 8.

Now onward to code itself. There's only one public decode function, but it calls one of the private ones depending of the flag. There's a pattern matching on <em>long </em>key, and binary data. As you can see here I used <em>::size </em>accordingly.
What's worth noting is if you want to match against <em>unknown sized</em> binary data you can use ::binary. Here I used it for body and for "rest" in main function - as before getting flags I don't care about size and body.

And that's it! Not a lot, but I learnt a bit when it comes to working with binary data in Elixir and made code a bit "better".
