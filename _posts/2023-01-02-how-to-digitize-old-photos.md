---
published: true
title: How to digitize old family photos with the Epson FastFoto
---

# The Problem

My mom, bless her heart, had for years been scanning all of our family photos via a flatbed scanner, one-by-one. 
Needless to say, this was an extremely slow, tedious process, and also became a management headache because 
the app she was using for it didn't correctly timestamp the photos, so they would show up all over the place in Google and Apple Photos.

For her birthday this year, I made up my mind to solve this and help her finally complete the project as quickly and painlessly
as possible.

Initially, I had the idea to just send the photos off to a bulk-scanning company. There are several around that will 
scan photos in high-resolution for a low price per photo. This was a non-starter, though, because I knew that 
neither of us were comfortable taking the risk that our precious memories would get lost in the mail, and it wasn't clear to me 
whether these companies would even handle timestamping the photos for us.

So the requirements for the solution were:
* Scanning the photos must happen at home
* Photos must be able to be scanned in bulk
* There must be an easy way to timestamp the photos

# The Solution

After doing some research, the [Epson FastFoto scanner](https://www.amazon.com/Epson-FastFoto-FF-680W-Wireless-High-Speed/dp/B07DLX26BB/ref=sr_1_3?crid=2JZWCOFTDF6QU&keywords=epson+fastfoto&qid=1672699932&sprefix=epson+fastfot%2Caps%2C198&sr=8-3&ufe=app_do%3Aamzn1.fos.ac2169a1-b668-44b9-8bd0-5ec63b24bcb5)
fit the bill perfectly.

![]({{site.cdn_path}}/2023/01/02/epson_fastfoto.jpg)

_It is endorsed by Shaq, but unlike Shaq's [FTX endorsement](https://en.wikipedia.org/wiki/FTX), Epson is not a massive Ponzi scheme. Too soon?_

It seemed to be the most popular of the consumer bulk scanners out there, could scan as quickly as one photo per second, 
had a price point that made it actually cheaper than sending the photos off to be scanned, 
and came with software that would timestamp the photo batches. As a bonus, my mom could use it after we completed the project
in her genealogy/family history work. Sold.

We managed to scan all of my parents' old photo albums and the ones from my pre-digital childhood (totalling just over 8,500 photos), in just a few weeks.
Most of the time it took was just taking photos out of albums and putting them back; the actual scanning was incredibly
quick and painless.

# A few features I like

The FastFoto does some enhancing of photos after scanning which I've been impressed with.
These enhancements include red eye removal, color correction, and bumping the contrast which makes
faded photos look much better. It doesn't auto-rotate images, unfortunately,
but I use Google Photos and it has a feature that detects images that aren't rotated properly
and can correct them for you.

![]({{site.cdn_path}}/2023/01/02/original_enhanced.jpeg)

An example photo of my mom and her sister at Multnomah Falls in 1991. 
The original is on the left, enhanced on right.

The enhanced photos are stored alongside the original in this format:

![]({{site.cdn_path}}/2023/01/02/enhancement_structure.png)

Where the `_a` denotes the enhanced version of the photo.

For fellow programmers/nerds, I wrote a Python script to walk through the FastFoto directories
and put the enhanced photos in their own folders. You can find that [here](https://github.com/davidmerrick/fastfoto-utils).

Another feature I'm a fan of is that it can scan the back of images. This was useful for us
because many of the photos had notes on the back, which provided some helpful context about where or when the photo was taken.

Overall, we've been really happy with the scanner and I recommend it to 
anyone who needs to digitize a large collection of old family photos.