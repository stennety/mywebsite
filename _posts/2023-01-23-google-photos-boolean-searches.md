---
published: true
title: Pro Tip - Boolean Searches in the Google Photos Web UI
---

I'm an Apple fanboy, but Google Photos is my primary service for organizing photos. I love that it
supports group albums that others can contribute to, and it has some slick features like
rotating photos in batch when it detects they're askew.

That being said, it's not without its shortcomings. One of which is searching in the web UI, which is what I mainly use.

I'm a huge fan of [The Last of Us](https://www.imdb.com/title/tt2140553/),
and have been digging the HBO adaptation, so I'll use characters from it for my examples.

Let's say I want to find photos of Joel and Ellie.

In the mobile app, you can do this. I can search for photos that have Joel and Ellie in them, or photos of _only_
Joel and Ellie.

No such option in the UI, just this open-ended search bar.

After a bit of experimentation, however, I discovered that you can do
these searches in the web UI with boolean operators.

Searching for `"Joel Miller" AND "Ellie Williams"` results in photos with both of them (note that you need both people's names in
quotes).

Searching for photos of `"Joel Miller" OR "Ellie Williams"` results in photos that feature either or both of them.

Note that you can chain these as much as you want. i.e. `"Joel Miller" AND "Ellie Williams" AND "Tess Servopoulos"`.

This doesn't totally have parity with the mobile app; there doesn't seem to be a query that gives me photos with
only us in it in the way that the mobile app does. But it gets us most of the way there. 
I do hope they ultimately bring the web UI more into parity with mobile, since web is mainly what I use.

# Other search parameters

Note: This is a short list for now. I'll update it as I find other
hidden search parameters. Leave a comment if you know of any and I'll 
add them!

## Filter selfies

This searches only for photos of me which are selfies:

![]({{site.cdn_path}}/2023/01/23/selfie_filter.png)

And this search _excludes_ photos which are selfies:

![]({{site.cdn_path}}/2023/01/23/no_selfie_filter.png)

## Find photos which are not in any albums?

This has been a [long-requested](https://support.google.com/photos/forum/AAAAzDQC9KEYao5yh8z-us/?hl=en&gpf=%23!topic%2Fphotos%2FYao5yh8z-us)
feature that has unfortunately not been implemented at the time of this writing.

I think it would be immensely useful to be able to search, for example, of 
old family photos which are not in any of my family albums yet.

# gapi-querier

A clever engineer wrote [this tool](https://github.com/jonagh/gapi-querier) for 
hitting the Google Photos API directly. I may start using this for my more advanced search 
needs. For example, it can iterate over all your photos and find ones that aren't in any albums.
