---
published: true
title: Pro Tip: Boolean Searches in the Google Photos Web UI
---

I'm an Apple fanboy, but Google Photos is my primary service for organizing photos. I love that it
supports group albums that others can contribute to, and it's got some slick features like
rotating photos in batch when it detects they're askew.

That being said, it's not without its shortcomings. One of which is searching in the web UI, which is what I mainly use.

Let's say I want to find photos of my dad and I.

In the mobile app, you can do this. I can search photos that have my dad and I in them, or photos of _only_
my dad and I.

![]({{site.cdn_path}}/2023/01/23/mobile_search.jpg)

No such option in the UI, just this open-ended search bar.

I proxied the calls the mobile app makes and...it uses a custom [gRPC](https://grpc.io/) endpoint 🤦🏼‍♂️️.

After some experimenting, though, I discovered that you can do these searches in the web UI with boolean operators.

Searching for photos of me AND my dad results in photos with both of us (note that you need both people's names in quotes):

![]({{site.cdn_path}}/2023/01/23/david_and_dad.png)

Searching for photos of me OR my dad results in photos that have either or both of us in them.

![]({{site.cdn_path}}/2023/01/23/david_or_dad.png)

Note that you can chain these as much as you want. i.e. "David AND Dad AND Mom":

![]({{site.cdn_path}}/2023/01/23/david_and_dad_and_mom.png)

This doesn't totally have parity with the mobile app; there doesn't seem to be a query that gives me photos with 
only us in it in the way that the mobile app does. But it gets us most of the way there. I do hope they bring the 
web UI more into parity with the mobile one.

For more on advanced search in Google Photos, I had mixed results with the queries in [this Reddit thread](https://www.reddit.com/r/googlephotos/comments/rxthdo/advanced_google_photos_search_syntax/).
I'll keep experimenting and will update this post with new finds. Feel free to comment with any advanced Google Photos 
search params you're aware of.