---
post_title: RabbitMQ vs ZeroMQ
author: dreat
layout: post
published: true
post_date: 2017-03-31 21:58:32
tags: [archived, integration, rabbitmq]
categories: [theory, projects, old_blog]
---
<div style="direction: ltr; border-width: 100%;">
<div style="direction: ltr; margin-top: 0in; margin-left: 0in; width: 6.6041in;">
<div style="direction: ltr; margin-top: 0in; margin-left: 0in; width: 6.6041in;">

As for OpenSettlersII I want to present an interface to be able to implement for any possible GUI. And as I don't want to tie anyone with Elixir/Erlang I decided to go with messages. I looked throu the net and my own experience, and there are two picks that I though I could use
<h1>RabbitMQ</h1>
RabbitMQ is a Your Typical Message Queue. There's a message broker that handles messaging and whatnot. It's written in Erlang, which is huge advantage, as I could use it directly from Elixir (you can call any Erlang function from Elixir with no obstacles). Not only that -there's an official support for Elixir itself. I also used it in my previous work, as a client. It was trivial, as should be using it in OSII.

Or is it? My aim is to be able, after getting interface for GUI, to get started as quick as possible. With RabbitMQ, when you get to the server part, not only you have to install additional software, it can get ugly quickly. As for commercial products it's not a problem, as there's company with support behind it, for open source, pet project it is a problem.
<h1>ZeroMQ</h1>
I really need a citation here, but apparently creator of protocol for RabbitMQ decided that it's not really that good and did ZMTP (ZeroMQ Message Transport Protocol). It is brokerless message queue and some may argue that it's just simple socket. The biggest problem is message persistency - if you don't have anything to hold/save messages while other party is offline - you'll lost them. This doesn't really sound like a problem to me, as I think that there are some mechanisms in OTP that can help me here.

ZeroMQ is really easy to configure, I worked a bit more with it and have fond memories with it. Basic communication worked out of the box, no need for any additional installations or configurations.

&nbsp;

I decided to go with ZeroMQ for reasons stated above, but there's one more reason. I may not google that much, but I haven't seend any ZMTP 3.0/3.1 implementations made in Elixir. There are some bindings, sure. But nothing made out of scratch. I won't lie - if I can learn even more doing this project and possibly make first 3.0/3.1 ZMTP for Elixir - I'm in!

</div>
</div>
</div>
