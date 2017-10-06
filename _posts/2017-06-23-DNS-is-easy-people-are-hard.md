---
layout: post
title: DNS is easy. People are hard
---
As the old New Yorker cartoon goes, ["On the internet, nobody knows you're a dog."](https://en.wikipedia.org/wiki/On_the_Internet,_nobody_knows_you%27re_a_dog) If you tell a computer that you are [Big Bird from Sesame Street](https://en.wikipedia.org/wiki/Big_Bird), it will believe you unless someone had instructed it beforehand how it can verify claims of Big Bird-ness; like checking if they're 8 feet 2 inches tall, yellow and covered in feathers.

The same rule applies to e-mail. If you hand an e-mail to a mail server on the internet and tell it "This email was from thepresident@whitehouse.gov" it would believe you, unless we tell mail servers around the world beforehand how to tell what a valid email from "whitehouse.gov" is. 

The main way to do this is through the specific DNS records. If you own a domain, you should be the only one who can set the DNS and tell the world that email that comes from this domain will have certain characteristics to check for:

* SPF - Sender Policy Framework. Outlines what IP addresses can send email for this domain.
* DKIM - DomainKeys Identified Mail. This is a way to digitally sign messages. You have your private key set internally on whatever sends your outbound mail and by publishing the public key in DNS people can verify that it came from you.
* DMARC - Domain-based Message Authentication, Reporting & Conformance. In addition to being a mouthful, it gives instructions of what to do with messages that don't pass the two tests above.

If you're using G-Suite (Google hosted email) like I am, it's dead simple to set up. Following their quite simple documentation, it only took 15 minutes for me to add  [SPF](https://support.google.com/a/answer/33786?hl=en&ref_topic=2759192&visit_id=1-636320706039003987-1662906503&rd=1), [DKIM](https://support.google.com/a/answer/174124?hl=en&ref_topic=2752442&visit_id=1-636320706039003987-1662906503&rd=1) and [DMARC](https://support.google.com/a/answer/2466563?hl=en&ref_topic=2759254) settings for this benjamin-hering.com domain.

So if it's so simple, why don't more big name domains have all three setup? Many do. Most of the big tech or finance companies have this locked down tight. paypal.com, ebay.com, google.com, etc all have DMARC setup to completely junk any email that says it's from their domain but doesn't pass the SPF & DKIM checks. But as of this writing, ford.com, whitehouse.gov, and npr.org don't have and DMARC enabled. Even worse, ford.com & whitehouse.gov have their SPF records even in 'soft fail' mode where messages that fail that check will still be delivered.

So why doesn't the official White House website take advantage of these additional protections against people impersonating them in emails? Well for starters, the have the full weight of the FBI to come slamming down on anyone pretending to be the President. (Seriously, don't send fake White House emails. It's a bad idea.) But my hunch is that the real reason that they - and everyone else that doesn't have the full might of three letter agencies to throw around - don't have DMARC setup everywhere is people.

[![The two hardest things in Computer Science are: People, and convincing others that "People" is the hardest thing in Computer Science.](https://blog.benjamin-hering.com/images/hardest-thing-is-people.png)](https://twitter.com/listrophy/status/876129823130869760)

Setting up a DNS record? Super easy. But can you figure out all of the random places that send email on your behalf on a large organization so you don't break Marketing's email list through MailChimp or Customer Support's communication in Zendesk, and oh by the way the scanner in the copier has it's own mail server to send scanned images and once a year our System Administrators might get a super important alert that's sent Amazon's Simple Email Service that's essential that it gets through.

DNS may be easy, but coordinating with people, communicating with people, gathering 100% complete information of your organization from people is *hard*. 
