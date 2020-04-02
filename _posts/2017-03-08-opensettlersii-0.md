---
ID: 41
post_title: 'OpenSettlersII #0'
author: dreat
post_excerpt: ""
layout: post
permalink: >
  http://dreat.info/2017/03/08/opensettlersii-0/
published: true
post_date: 2017-03-08 07:00:08
---
<strong>This is the first post in series about OpenSettlersII aka GetNoticed! project.</strong>

<em>I will always link commit(s) and describe what's happening.</em>

First I'll talk a bit about Elixir itself and why I picked it up from all available functional languages.

It all started over 30 years ago with the creation of Erlang. It's a functional language which main purpose was telecoms. In this world high availability, scalability and all of this good stuff was needed. While I was talking with a friend, who worked with switches back in the day, he told me that "nine nines*" was the thing everybody talked about. And in optimistic scenario, Erlang delivered that. How? "Let it crash". You fire up many processes (elrang's, not OS') and in a case of failure - you let process fail, die and restart. All without system even noticing it. There are processes which main job is to supervise others (hence the name "supervisor"). Should any process fail, supervisors will restart it, possibly providing some data. Worth noting that you can do all sorts of app in Erlang, not only telecom related ones.

After Erlang came OTP. Long story short it's a framework that helps building applications with all the goodness described.

And then comes Elixir. Known Rubyist, Jose Valim, found that Ruby doesn't satisfy his needs anymore. Around same time he came across Erlang and OTP. That resulted in language with nicer syntax than Erlang, really friendly and open community with some additional features/sugars. What's really worth mentioning is the fact that Elixir itself is mostly written in Elixir, as it has elastic and pleasant metaprogramming.

<strong>Now back to OpenSettlersII</strong>

<a href="https://github.com/Dreat/OpenSettlersII/commit/019b2f9e48ee35340a177cadd732bab477d189e6"><span lang="pl">First Commit.</span></a>

This is just a simple project initialization, but it shows the tools Elixir is shipped with. Mix handles creating projects, handling deps, running tests, compiling etc. I just created new, empty, configurable project (please, take a while to look at already existing place to write tests! &lt;3).

Next commits will be more interesting, I promise.

<em>*we're talking about 99.9999999% availability/uptime here</em>