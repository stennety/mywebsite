---
post_title: 'OpenSettlersII #3'
author: dreat
layout: post
published: true
post_date: 2017-04-06 07:00:19
tags: [archived, osii]
categories: [old_blog, projects]
---
<a href="https://github.com/Dreat/OpenSettlersII/commit/1d645945893f63fe8e6c0f29ef9f35c6e645130e">As always, commit to look at!</a>

Today even smaller changes as I had little to no time, but at least moving slowly forward.

I added encoding of long frames. I did the same thing as in decoding, pattern match on flags and then construct proper binary data.

In tests file I added 2 tests for long frames and changed body: property in input to be binary as well. I think it's starting to be a good time to introduce some struct for my frames, but I will worry about this later. I'm also not happy with return values - they should be more "elixiry", so next step will be worrying about this (with some explanation what does it mean).

As I dislike post trailers - <a href="https://www.erlang-factory.com/rome2017#home">I'm going to Erlang Factory Lite</a> tomorrow. I will try to write down as much as possible and make a interesting review next week, so stay tuned!
