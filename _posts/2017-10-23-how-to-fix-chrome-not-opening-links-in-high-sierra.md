---
published: true
title: How to fix Chrome not opening links in High Sierra
---
After upgrading to High Sierra, and re-setting Chrome as my default browser, I ran into an annoying problem. Clicking links in Slack and iMessage were opening a blank window in Chrome, instead of actually opening the link. After hunting around, I discovered this [Reddit thread](https://www.reddit.com/r/mac/comments/72pwzj/high_sierra_opening_link_in_imessage_opens_blank/). Several users reported that upgrading to Chrome 62 (the beta, at the time of this writing), fixed the issue. I tried this myself and confirmed that it works.

So, if you're running into the same thing:

1. Download it from [here](https://www.google.com/chrome/browser/beta.html).
2. Quit Chrome.
3. Drag the beta into your Applications folder.
4. Open Chrome again.
5. Check that links open correctly.

And it should be working again:

![]({{site.cdn_path}}/2017/10/23/working-again.gif)

_Update, November 2: After using my browser for a bit, this broke again. Haven't had a chance to look into a new fix yet. Will update this when I find one._

_Update to the update, November 2: It's working again in beta version 63.0.3239.30, released [yesterday](https://chromereleases.googleblog.com/2017/11/beta-channel-update-for-desktop.html)._