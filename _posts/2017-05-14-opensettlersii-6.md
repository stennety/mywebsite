---
post_title: 'OpenSettlersII #6'
author: dreat
layout: post
published: true
post_date: 2017-05-14 20:38:02
tags: [archived]
---
<a href="https://github.com/Dreat/OpenSettlersII/commit/591554e9b2fdc1eeddba9dbde631a4b233241b9a" target="_blank" rel="noopener noreferrer">As always, a commit!</a>

Slowly crawling towards functioning lib.

This commit is not really that different from other, yet I started using Elixir convetion for return values: the tuple <em>{:ok, response}</em>/<em>{:error, message}</em>. I am quite not happy with  the as_server function and I guess I will rename/rewrite it later. It's quite obvious what it does - checks the rightmost bit and responds and sets "as server" to according boolean value.

Also, encoding and decoding version - I have no way of validating it, but I'm not sure if I should. This is one of two things I need to check before proceeding - another one being the Signature - I'm not sure if it's version specific or not, so that's something to get to know before coding it.

And that's it for now :)
