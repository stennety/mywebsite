---
ID: 115
post_title: 'OpenSettlers#5'
author: dreat
post_excerpt: ""
layout: post
permalink: >
  http://dreat.info/2017-04-30-opensettlers5/
published: true
post_date: 2017-04-30 22:37:21
---
<a href="https://github.com/Dreat/OpenSettlersII/commit/e75c850094b394d51e60dd1712befa70e10d357f" target="_blank" rel="noopener noreferrer">As always - a commit!</a>

Here's a thing I struggled while doing previous commit - decoding command to something more structurized - according to docs it's composed of command name and body - all coming in one binary. I had to get the name and body (if any)

It seems like you have to use <em>::binary-size</em> for the first one, and just <em>::binary</em> for the rest - I may be wrong thou and I will have to research that more in the future.

It's slowly starting to be a mess - that's why I refactored enconding a bit to make a use of pattern matching. Not it's more "elixir style". Still I feel the lack of the bigger picture - I guess rushing into it wasn't as good idea as first though ;) I will have to do some more research and maybe a post on a protocol - it will surely help me. For example - turns out that command will never have "more" frames incoming - as you can see in changes in code - now all command have "more" set as false (with is quite redundant).
