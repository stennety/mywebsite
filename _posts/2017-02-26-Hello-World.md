---
layout: post
title: Hello World!
---

Hello world! I'm Benjamin and I figure things out. For the longest time, I had my own 'site' at a vanity URL; nothing all that much to look at, but enough to not be completely embarrassed when people tried to see if there was something behind the email address I put on resumes. At the time I used the tools that I knew and slapped something together in a few afternoons using Joomla and a cheap webhost and completely forgot about it.

Months later I start moving more towards a security focused path professionally, and start chiding a non-profit I volunteer with that they haven't been keeping up to date with their Wordpress security patches *all the while completely forgetting that I've left a completely unpatched CMS out in the while for years*! And this was a site I was sending employers to as well!

Filled with the requisite amount of guilt and shame, I knew what I needed for repentance; a simple static site. They're fast, cheap to host and above all I don't have to worry that my unpatched flat text files have a hidden SQL injection or the like.

I started out with Jekyll. It's number one on GitHub, lots of themes, and generally seems well regarded. I don't have much Ruby experience, and after 15 minutes of trying `sudo gem install foobar` to get all the dependencies together I started wondering if editing artisanal HTML files by hand would be less painful. Worse still, maybe I could fumble my way around Ruby enough to stack everything together only to find smash myself into a wall of frustration the next time I have a new laptop and want to update the site.

In short, super painful. It was enough to make me even play around with a [~1200 line bash script static site generator](https://github.com/cfenollosa/bashblog), which like most complicated bash scripts is awesome to behold, an amazing programming feat by the person smart enough to put it all together, and works fantastically until it doesn't. After I while, I was getting double posts and the thought of troubleshooting someone else's ~1200 BASH script was painful.

I really thought that this would be a solved problem. All I want is to hammer away on a keyboard, press go, and have that get all served up statically by some site somewhere without having to dig in HTML where I don't have to worry about an OWASP 10 ten vulnerability to some PHP corner case making me look like a complete fool on the internet. I can handle making myself look like a fool without the automation and scale of the rest of the internet, thank you very much. 

Latest iteration is [Jekyll Now](https://github.com/barryclark/jekyll-now). It's been surprisingly painless. Fork, edit, push and all the rest of the magic happens in GitHub behind the scenes. And if, by the worst case, I have to run through yet another iteration, hopefully all my blog posts will be still in a easy enough to migrate markdown format.

Still better than trying to secure Wordpress...
