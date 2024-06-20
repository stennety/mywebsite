---
title: It works on my machine
date: '2018-10-26T00:00:00.000Z'
categories:
  - Testing
redirect_from:
  - /it-works-on-my-machine/
---

So, you just found this great bug and it's returned "cannot reproduce", or you have been told "it works on my machine", classic right?

As a tester, in this situation, it can be easy to get defensive. Am I being told I am making it up? Am I being disrespected, why should I raise bugs if they are not important enough to fix?

My suggestion, turn this on its head and consider this for a moment. Time to get technical! What details can be added to help identify the root cause of the issue? Can you do more investigation and help understand what is different between the environment you tested on, and the one the developer tried to reproduce it in?

### Ways you could add value in response to "it works on may machine" in include:

1. Identifying the exact build or deployment you observed the issue on, and check is this the same build the developer is checking against? Can you check the build they are using, maybe the issue is already fixed, but you haven't been given the latest code?
2. Identify what platform are you both using. If it's web, make sure to check not only the Browser, but the version of that browser. If it's mobile, what version of Android or iOS is installed?
3. Is there any additional logging you can get to help add context? If you can find an exception being thrown that is captured in a log, this can go a long way towards helping identify the issue.
4. If you can continue to reproduce the issue, can you give the Developer access to your machine or environment? If your remote, can you setup a screen sharing session? At a minimum, it should be easy enough to capture a video of the steps. for this, I use Open Broadcast Software Studio ([https://obsproject.com/download](https://obsproject.com/download) "https://obsproject.com/download")), but many alternatives exist.
5. If any of these have helped get to the root of the problem and get the bug fixes, try and use them more often in your usual bug reports, and see if you can reduce your "Works on my machine" count.

I hope my thoughts on this are useful, I am really interested to know if you agree, disagree, or even better have additional hints and tips! if you do, please let me know on twitter: [https://twitter.com/fullsnacktester](https://twitter.com/fullsnacktester "https://twitter.com/fullsnacktester")
