---
ID: 113
post_title: 'Erlang Factory Lite Rome 2017 #1'
author: dreat
post_excerpt: ""
layout: post
published: true
post_date: 2017-04-30 22:36:46
---
Hello for the second (and last) part of EFL Rome2017 post! You can find previous one <a href="https://dreat.info/2017/04/17/erlang-factory-lite-rome-2017-0/">here</a>
<h3 class="talk-title" style="text-align: center;">Music and Message Passing Concurrency <em>by Joe Armstrong</em></h3>
Here goes the big name, Joe himself. While it may suggest a lot about music, it was more about messaging and integration. Joe showed how he could remotely control <a href="https://sonic-pi.net/" target="_blank" rel="noopener noreferrer">Sonic Pi.</a> He was glad that there's an other way to control a program "than clicking a bloody mouse!".

He did that sending properly coded messages to UDP port. And here it all started. Joe is a big supporter of messaging based communication. API suposes a programming language, so it's not a best way - you're tied to programming language. As the main topic emerged once again - how to integrate and there are some programming languages better to do other things - so you'd naturally like to use them for specific purposes and not be stuck with one.

You should also treat specific parts/modules/apps like a black boxes - you know nothing (even the language used) except for how to communicate (using messages, of course ;) ) - "the protocol only matters."
<ol>
 	<li>Pick transport (TCP/UDP)</li>
 	<li>Pick encoding (XML/JSON/YAML/etc)</li>
 	<li>Pick protocol description (RFC/UBF/etc)</li>
</ol>
![Some combinations for you to pick from](/images/eflr2017-1.jpg)

![With the Joe himself!](/images/eflr2017-2.jpg)

Joe picked OSC over TCP/UPD with some English to describe it. OSC is a very simple encoding - and it has "simplicity by design", as Joe said, "if you can't create complex data structures, the interface will be simple and easy to understand".
<blockquote>"if you can't create complex data structures, the interface will be simple and easy to understand"</blockquote>
Which is another way worth remebering. Complicated systems are easy - you just keep adding stuff. Simple systems are difficult to make.

I think thou - if one thing should be remembered from this talk it's fact, that we should be able to understand the system by looking on the messages going in and out.
<h3 class="talk-title" style="text-align: center;">Adopting Elixir in a 10 Year Old Codebase <em>by <span class="modal_speaker_name">Michael Klishin</span></em></h3>
While it seems like adding Elixir to some Ruby ecosystem, it was actually using Elixir in Erlang project. They did a CLI tool in Elixir as a "check" with ~8k LOC, ~750 tests and 70 CL commands available.

I will just point out good:
<ol>
 	<li>It's more approachable than Erlang</li>
 	<li>It's a recriutment honeypot - easier to lure people into project</li>
 	<li>Has decent standard lib</li>
 	<li>Potentian contributors could have not contributed if it was in Erlang</li>
</ol>
And bad things he learned:
<ol>
 	<li>Integration with Erlang.mk is a pain</li>
 	<li>Elixir/Erlang data type mismatches</li>
 	<li>String vs Binary</li>
 	<li>Some Elixir libs are a one man show ( ;) )</li>
</ol>
Overall Michael feels like Elixir was worth adopting as sees a bright future for it - and you can utilize it even without agents, macros and sweet libs. He was even more optimistic for Elixir than for Erlang itself.
<h3 class="talk-title" style="text-align: center;">A Little Replica of the Internet in Elixir <em>by <span class="modal_speaker_name">Ju Liu</span></em></h3>
He describes himself as a Mad Scientist - and, boy, he is!

Basically it was a little trivia on the Internet and his attempt to do a small replica of it's routing system using Elixir (and nerves). He had 2 RP3s connected, simulating North America and Europe with routing links. There's a bit of how the Internet works and how it connects - he used that common knowledge to simulate it and it worked like a charm. There a code online if you want to look at it!

![This is the Internet! Be careful not to break it!](/images/eflr2017-3.jpg)

The real show started when he took the router, connected third Rasp and added Asia - it all worked! It was a nice show for the <a href="https://nerves-project.org/" target="_blank" rel="noopener noreferrer">Nerves project</a> to show what you can do with them. Funny thing - the most problems, and the slowest part was HTML+JS frontend where all the arrows where hacked as separate CSS elements - so it crashed when connection number rose. Still, great project and <a href="https://github.com/Arkham/mini_router" target="_blank" rel="noopener noreferrer">you can look at it on github!</a>
<h3 class="talk-title" style="text-align: center;">Embrace the Database with Ecto <em>by <span class="modal_speaker_name">Josh Branchaud</span></em></h3>
Basically it was how to use the Ecto and how to query the database. I really don't know if it was the high temperature in the room, or it was just quite obvious to me - but I cannot say that I didn't find anything at all - there was one statement that I won't say if I find true or false - because it's strengh is that it provokes some interesting conversations:

<em>"The database should be the ultimate gatekeeper - it should validate the data coming in"</em>
<h3 class="talk-title" style="text-align: center;">Monitoring and Pre-emptive support: The road to five nines on the Beam <em>by <span class="modal_speaker_name">Francesco Cesarini</span></em></h3>
It was a great talk with a lot of focusing on "no single point of failure" "we need at least 2 of everything". He showed 2 types of monitoring usefulness - you can prevent failures, or do quick post-mortems. With monitoring you can prove your innocence in 1.5 minutes - without trying to replicate the bug and trying to debug. While there's a lot to be said - he said so many cool stories I guess you have to go and give it a listen yourself - <a href="https://www.youtube.com/watch?v=EHqs_RrVMoE" target="_blank" rel="noopener noreferrer">this one seems almost identical.</a>

And this was it - it was a great experience and possibility to talk with those people was sometimes eye-opening.
