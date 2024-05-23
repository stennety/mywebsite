---
layout: post
tags: ide android travel tools
#categories: []
date: 2024-06-10
#excerpt: ''
#image: 'BASEURL/assets/blog/img/.png'
#description:
#permalink:
title: 'My Low-Cost, Fully Featured, Offline Coding Setup For Travel - Zero to 40.000ft'
#
#
# Make sure this image is correct !!!
og_image: 
#
#
# make sure comments are enabled
comments_id: 
math: false
---

What do you do if you want to code using an (almost) fully featured IDE setup, but
you're up 40.000ft in the air, without internet, and you don't want to[^dont-want-to] pay for
business class? I don't know what _you_ would do, but I can show you what I did.

# A Brief History

This setup started when I searched how to set up VS Code on Android a couple of
years ago. At the time, I did not find any guides, though today
[they exist](https://www.codewithharry.com/blogpost/install-vs-code-in-android/). Maybe
they did at the time and I just did not look hard enough. Anyways, I ended up going
down a very different route and by now I use basically the same setup at work,
at home, or when travelling. 

# tl;dr

It's just helix and tmux running on termux on an Android tablet.

# Overview

!!! Insert picture here

As evidenced, my travel setup works from sea level to 40.000ft. I'm pretty sure
it would work even higher, and if some billionaire wants to take me up to space
I'm up for it. Anyways, my setup features syntax hightlighting, code completion,
diagnostics, quick actions, code navigation, and of course compiling and executing my code
among other things.

# How It's Done - The Essentials

If you read the tl;dr, you saw that there's nothing magical about the setup, just
a few off the shelf open source products I use together. My hardware is an
an Android tablet using a bluetooth keyboard for input, but no mouse. The software
stack rests on the excellent [`termux`](https://termux.dev/en/) app, which
provides me with a terminal emulator that feels almost like a full linux environment.
You can download a lot of essential software through its package manager, such
as compilers, git, but also the editor I use.

As my code editor I use [`helix`](https://helix-editor.com/), which is a modal, terminal-
based editor like vim or emacs. In a previous iteration, I used [neovim](https://neovim.io/)
as my editor, which is also excellent and can make some steps of this setup much easier[^lsps-neovim].
I just switched over to helix as a matter of personal preference. To me, the important
thing is having an editor that is keyboard-first, because it saves me from using a mouse
or my fingers on the screen. Helix has great LSP-integration which
allows it to provide the IDE goodness we've come to expect and love, such as code completion,
navigation, diagnostics and so on. I'll get back to this in more detail below.

# Nice To Haves

!!! yadm 

# Problems

!!! mention debugging here
!!! perf does not run on termux
!!! arm processor (might be advantage or not)

# Endnotes

[^dont-want-to]: Let's just pretend that I _don't want_ to pay for business class, not that I _can't_...
[^lsps-neovim]: For example, if you use the `mason` plugin, downloading an LSP is super easy, barely an inconvenience.
