---
published: true
title: 'How I''m doing backups in 2023 '
---
![]({{site.cdn_path}}/2023/03/01/backups.png)

The process of [digitizing thousands of old family photos](/2023/01/02/how-to-digitize-old-photos/) involved using up several hundred more gigs of storage space, and prompted me to rethink my family's backup strategy.

To give you a picture of my family's IT footprint, we're all Apple; I've got an iMac, my parents have an iMac and a MacBook Pro, and my sister has a MacBook Air. Our aggregate data footprint is just shy of 3TB. 

Up until this year, I'd only had Time Machine backups on my and my parents' iMacs, and then all of our computers backed up to [Backblaze](https://www.backblaze.com/) for cloud backups. Backblaze was great; the setup was easy and the service was reliable, it just became hard to justify paying $280/year for cloud backups when cloud storage is so cheap. On AWS Glacier, for example, we could store all of that for under $3/month, and Amazon is constantly sending me surveys in exchange for AWS credits.

![]({{site.cdn_path}}/2023/03/01/aws_credits.png)

_$100 for a 10-minute survey? Why yes, thank you, Mr. Bezos_

So essentially the problems with our strategy were:
1. Price was too high
2. No on-site backups for three of our computers
3. We didn't have an easy way to share hundreds of gigs of family photos as raw files


# Solving 1 and 2: Pricing and local backups

I bought Synology NASes for myself and my parents. I picked up the 2-bay DS220+ for my parents and the 4-bay DS923+ for myself. They're a little more expensive than entry-level NASes, but I chose them because they're very easy to set up, and have a GUI with an app store for installing packages, like [Tailscale](https://tailscale.com/) and Glacier backups.


I bought 5x 8TB WD Red Plus drives, which gave my parents' NAS 8TB and mine 16TB, with the Synology Hybrid RAID (SHR) configuration. I chose the WD Red Pluses because they're able to spin down when idle to save power.

Next, I needed a client to actually do the backups. I tried out a few different backup clients, and I liked [Arq](https://www.arqbackup.com/) the best. I set up all of our computers to do hourly backups to our respective Synology boxes, and to do daily backups to AWS Glacier Deep Archive. Arq's backups are incremental, and you can configure them to go as far back as you want. I set ours up to store daily backups for the last 30 days, weekly for the last 8 weeks, and monthly for 6 months. Probably overkill, but hey, storage is cheap. I also added some shared network folders on the Synology boxes so we could share data between multiple computers. I set up the Synology boxes to do a daily backup of those to AWS as well.

The upside of using Glacier Deep Archive is that it's extremely cheap to store data on it, at $0.00099 per GB at the time of this writing. The downside is that they charge for ingress and egress, so you pay a little more upfront and in the event of an emergency. That tradeoff was fine with me, as this is intended to be for emergency data recovery and is redundant to the Synology backups. 

![]({{site.cdn_path}}/2023/03/01/glacier_retrieval.png)

_If one of our houses burns down, we'll probably be occupied with more important things and can spring for the slower retrieval pricing from Glacier._

Overall, our costs were:
* NASes: $900
* Drives: $300
* Data ingress to AWS: ~$30

But I expect these to last 7-10 years. So that upfront cost of $1,250 with minimal monthly costs on AWS is significantly less than we'd pay for Backblaze over that time. And it gives us redundant local backups for as many new computers as we might acquire during that time.

# Solving 3: Sharing files between machines

Originally, I thought I could put all of our computers on a Tailscale VPN and then share a folder from my NAS with my parents and sister but this was slooooow. Home upload speeds in 2023 are still pretty throttled (even on gigabit, I only get about 50Mb/s). 

So I opted to instead sync files between our NASes. This way, we could each access the files quickly, and any changes on either end would eventually sync. [Resilio sync](https://www.resilio.com/) fit the bill really nicely, and they already had a package for Synology. As icing on the cake, they have an iPhone app that I can also use to download any files from there. This made it really trivial to share our family photos as raw files between locations.

![]({{site.cdn_path}}/2023/03/01/harry-potter-spell.jpeg)

_Though it sounds like a Harry Potter spell, Resilio is actually a peer-to-peer service which syncs files between devices. Which I think is pretty magical._

# What's left?

I still need to figure out a better workflow for photos. Right now, I have photos in Google Photos, iCloud, and a bunch of raw files on the NASes. If I wanted to migrate to a different photo service, it would be a huge pain, as I've made some metadata changes in each one. So I'd like to unify that more, now that I have the storage to keep all of those offline. But that'll be a story for another post 😄️.
