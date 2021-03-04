---
post_title: 'Erlang Factory Lite Rome 2017 #0'
author: dreat
layout: post
published: true
post_date: 2017-04-17 14:12:07
tags: [archived, conference]
categories: [old_blog, conferences]
---
Week ago I went to Rome to take part in Erlang Factory Lite, and, as promised, here is blogpost about it (the first part)

Starting with venue - it was near the centre of the city, easy to get with decent views. While inside was quite small (not a lot of people were there as well), the outside...

![What a place to take a break!](/images/eflr2017-0.jpg)

&nbsp;

Sadly, there were no recordings, but from what I saw speakers had the same talks as in some future (and maybe past?) events, so not all is lost.
<h3 style="text-align: center;">Pilgrim's Progress to the Promised Land <em>by Robert Virding</em></h3>
Opening talk by Erlang co-creator. It was a nice opening, showing learning Elixir as a pilgrimage. And it's quite good analogy. You begin your journey influenced by some prophets. It's important to validate their words - to decide if Elixir is the right tool for your job. Also the way of learning it is a bit like arriving to different interesting places.

Because of it's similarity to Ruby you quickly arrive to "Village of Confusion" as things don't seem to work they should. It's not an OO language (Joe had different opinion here ;) <em>Erlang is the only OO language</em> ).

Robert told us that people doing Erlang/Elixir are not scared of crashing things. And there are 3 ways of crashing things:
<ol>
 	<li>Just crash</li>
 	<li>Crash and clean - for example process holding database connection won't close it if it dies</li>
 	<li>Crash and restart - if process is critical to the system</li>
</ol>
Because of all this talking about crashing, you do a lot of upfront error handling - so you have it localized and easy.
<blockquote>"You have to accept that things go wrong it you want to build fault-tolerant systems" - Robert</blockquote>
<h3 style="text-align: center;">Stepping into a new era: injecting Elixir in a Ruby app <em>by <span class="modal_speaker_name">Andrea Leopardi</span></em></h3>
This was the talk about replacing some parts of the existing Ruby + Python system with Elixir (and adding new ones with Elixir). This was quite full of examples (like issues going down significantly and performance going up), but I think that the most important thing is:
<blockquote>Prepare your system: Split it into services first, or at least one monolith service and one small (it's a good start).</blockquote>
<h3 class="talk-title" style="text-align: center;">It's the Type Theory Baby! <em>by <span class="modal_speaker_name">Michele Finelli</span></em></h3>
This was talk full with nice theory. Michele defined a <em>formula </em>something that is always true or false. If you depend on external (I/O, DB, etc) logical formulas are no longer <em>eternal</em> - so this describes functional programming.

Nice thingies:
<ol>
 	<li><a href="https://homepages.inf.ed.ac.uk/wadler/papers/propositions-as-types/propositions-as-types.pdf" target="_blank">One thing to remember? Read this paper</a></li>
 	<li><a href="https://en.wikipedia.org/wiki/Curry%E2%80%93Howard_correspondence">Basically wiki article around this talk</a></li>
 	<li>Duck typing? No! It's untyped and it's fine!</li>
</ol>
<h3 style="text-align: center;">Cook your distributed in memory KV store <em>by Gianluca Padovani</em></h3>
Basically a explanation how <a href="https://github.com/basho/riak_core">Riak Core</a> works with concrete idea to implement. It was with some demos how to make a distributed KV store. And it worked like charm ;) I guess reading throu the code of this masterless cluster (nice idea btw) will be better than me describing it, but there one important quote
<blockquote>
<p style="text-align: center;"><strong>Always</strong> timeout!</p>
</blockquote>
<p style="text-align: left;">I've covered 5 out of 9 talks, so there's still material for next part, stay tuned!</p>
