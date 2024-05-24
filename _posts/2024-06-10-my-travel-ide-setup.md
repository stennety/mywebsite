---
layout: post
tags: ide android travel tools
#categories: []
date: 2024-06-10
#excerpt: ''
#image: 'BASEURL/assets/blog/img/.png'
#description:
#permalink:
title: 'My Low-Cost, Offline, Powerful IDE Setup for Travelling (Sea Level to 40.000ft)'
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
you're up 40.000ft in the air, without internet? And you don't want to[^dont-want-to] pay for
business class? I'll show you what I did and I am interested to see what you did
or would do.

# tl;dr

It's just helix, tmux and some lsp servers running on termux on an Android
tablet with a bluetooth keyboard.

# Overview

!!! Insert picture here

As evidenced, my travel setup works from sea level to 40.000ft. I'm pretty sure
it would work even higher, and if some billionaire wants to take me up to space
I'm up for it. Anyways, my setup features syntax hightlighting, code completion,
diagnostics, quick actions, code navigation, and of course compiling and executing my code
among other things. And yes, this text was also written on that setup on vacation.


# A Brief History

The first step that I took towards this setup was when tried to set up VS Code on my 
tablet a couple of years ago. At the time, I did not find any guides, though today
[they exist](https://www.codewithharry.com/blogpost/install-vs-code-in-android/). Maybe
they did at the time and I just didn't look hard enough. Whatever the case may be,
I ended up going down a very different route and by now I use basically the same
setup at work, at home, or when travelling. 

# How It Works

If you read the tl;dr, you saw that there's nothing magical about the setup, just
a few off the shelf open source products I use together. My hardware is an an
Android tablet using a bluetooth keyboard for input. There's no mouse, because I
barely need one.

## The Terminal - Termux

The software stack rests on the excellent [`termux`](https://termux.dev/en/)
app, which provides me with a terminal emulator that acts almost like a full linux environment.
You can download a lot of essential software through its package manager, such
as compilers, git, but also the editor I use.

## The Editor - Helix

As my code editor I use [`helix`](https://helix-editor.com/), which is a modal, terminal-
based editor like vim or emacs. In a previous iteration, I used [neovim](https://neovim.io/)
as my editor, which is also excellent and can make some steps of this setup easier[^lsps-neovim].
I just switched over to helix as a matter of personal preference. To me, the important
thing is having an editor that is keyboard-first, because it saves me from using a mouse
or my fingers on the screen. Also the way that helix or neovim deal with screen
real estate is great. There is no unneccessary clutter, just the code, which is all
the more valuable on a limited tablet display[^sidebar]. Helix has great LSP-integration which
allows it to provide the IDE goodness we've come to expect and love, such as code completion,
navigation, diagnostics and so on. I'll get back to this in more detail below.

## The Multiplexer - Tmux

The third pillar of my setup is [tmux](https://github.com/tmux/tmux/wiki), which
is a terminal multiplexer that allows me (among other things) add tabs to my terminal
or split it into different panes. That is very helpful when coding because helix
has no built-in support for executing binaries or tests. This might seem like a
limitation at first, but it has become a feature for me (do one thing well) and
the integration with tmux is seamless. I usually have two tabs open where
I use one for editing in helix and the other one for git operations, running my
binary or test suite. If I need to see code and output together, I open a split and close
it as soon as I don't need it anymore to save valuable screen real estate.

# Setting It Up

The most important things to get a nice development experience for a particular
language with helix is to set up the compilers (and/or runtimes) and the language
servers. The language servers are extra programs that helix can run in the background
and that give as the IDE stuff such as code completion, navigation, and diagnostics.
However, you have to install them on your system for helix to be able to find them
so in the following sections I tell you what I did for C++, Rust, and Python.
But first, you need to install helix, tmux, and git:

```shell
$ pkg update
$ pkg install -y tmux helix git
```

## C++

To install the necessary compiler toolchains and the language server (clangd),
use the following command:

```shell
$ pkg update
$ pkg install -y clang clangd llvm cmake ninja
```

You might have to restart termux. To verify that the C++ integration of helix
works, you can run `hx --health cpp` and you should see that everything (except
for debug adapters, more on that later) is marked as okay.

## Rust 

First install the rust compiler and toolchain (including cargo), as well as the
language server using: 

```shell
$ pkg update
$ pkg install -y rust rust-analyzer
```

Now if you check `hx --health rust`, you should see everything (again, except for
the debug adapter, see below) marked as okay.

## Python

The bare bones python setup is also pretty simple, but I had some trouble installing
popular numerics packages numpy and scipy. It's easy you know how, so I'll link
to those instructions as well.

```shell
$ pkg update
$ pkg install -y python
```

To install the language server expected by helix we can use `pip`:

```shell
$ pip install python-lsp-server
```

The important thing here is to install `python-lsp-server` and not the similarly
named `python-language-server`, which cost me an hour of my life to debug. If you
want to install numpy follow [these instructions](https://github.com/termux/termux-packages/discussions/19126),
while installing scipy is best done via termux' package manager using
`pkg install python-scipy`.

# Personalization

These are the essentials of the setup I use and I'll leave it at that for now. One thing
I like about it, is that it is very personalizeable. Take what you like from it and
change what you don't like. If you are looking for a way to manage your configuration
across systems, I can recommend [yadm](https://yadm.io/), which is available as
a termux package as well.

# Problems and Caveats

While I am very happy with this setup, there are some things that I did not yet
get to work or that are otherwise worth mentioning here.

Firstly, I did not get debugging working for Rust and C++. Unfortunately,
helix debugging support so far isn't great anyways, but I could not even get the required
debug adapter installed on my system (`lldb-vscode`). I'm grateful for hints.

The other things that I dearly miss is `perf`. Termux fors not have it and it
would be cool to do some performance measurements. I saw peope recommending
[on reddit](https://www.reddit.com/r/termux/comments/1c333l3/has_someone_gotten_perf_working/)
to use llvm's profiling instrumentation capabilities, but I did not get it to do
what I wanted, which was give me page faults and some other `perf stat` metrics.
Help appreciated.

The last thing that should be mentioned is that Android tablets typically use
Arm processors. That means if you (or a library that you depend on) use x86 instrinsics,
they won't work. Depending how you look at it, it can also be pretty cool
to have easy access to an Arm processor. Most of the time you won't notice anyways.

One problem I never had was performance. Granted, I don't use my travel setup
for huge projects, but I've not run into performance problems so far.

# Endnotes

[^dont-want-to]: Let's just pretend that I _don't want_ to pay for business class, not that I _can't_...
[^lsps-neovim]: For example, if you use the `mason` plugin, downloading an LSP is super easy, barely an inconvenience.
[^sidebar]: I remember missing the project navigation bar when I switched over from CLion and VsCode to neovim. Two weeks in I couldn't remember why I ever missed it and just appreciated the extra screen real estate. It's hard to imagine, but trust me, there are much better alternatives. Such as having fuzzy file finders pop up on demand, rather than having the project navigation, the menu bar etc. take up so much screen.
