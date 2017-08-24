---
layout: post
published: true
title: How to back up your custom Lightroom presets with git
tags: photography
---
_(These instructions presume you're using macOS)_

I have several Lightroom user and export presets that I wanted to back up. Digging into Lightroom, I realized that these presets are stored as text files, which makes them good candidates to back up using version control.

I set mine up to be stored in a single git repo on [BitBucket](https://bitbucket.org). If you haven't done so already, create your git repo.

To find your presets in Lightroom, go to Develop. Right-click one of your presets, and choose "show in Finder."

![]({{site.cdn_path}}/2016/11/15/1.png)

Move up two directories, open a terminal, and initialize your git repo here.

Stage, commit, and push your custom preset files, and you're done!
