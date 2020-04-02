---
post_title: 'OpenSettlers#4'
author: dreat
layout: post
published: true
post_date: 2017-04-23 21:35:21
tags: [archived, osii]
categories: [projects, old_blog]
---
<a href="https://github.com/Dreat/OpenSettlersII/commit/41929f3570c3c4450d5ffef3a5d824d103b8f606">As always - commit!</a>

I really need to spend more time. Today I struggled a lot with bitstrings. And still didn't find an answer for what I was looking for, but I created a map for command without redundant info. So no more flags, only command name, data and size.

After push thou I saw a better solution - I could do pattern match on functions, so I could eliminate switch. I get a lot of mess with all those maps. I think that rethinking/refactoring it should happen sooner than I initially thought.

Also "size" field seems a bit off. Additionally I don't feel as comfortable enough with specification as I was expecting, so I guess I'll spend some more time with it - this should also get me up to speed.
