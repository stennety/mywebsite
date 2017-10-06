---
layout: post
title: Custom Signatures for F5 ASM
---

So F5's documentation is pretty amazing and the automatic updates to the ASM signature set has taken care of 95% of the security issues that I've encountered so far. The last time that Apache Struts had a public exploit (the same vulnerability [at the root of the Equifax breach](https://www.bleepingcomputer.com/news/security/equifax-confirms-hackers-used-apache-struts-vulnerability-to-breach-its-servers/)) it was great to log on and see that it was [just blocked by the existing ruleset](https://devcentral.f5.com/articles/apache-struts-remote-code-execution-vulnerability-cve-2017-5638-25617).

But there's always going to be times where something bad is something unique to your environment. There's no reason to expect F5's security folks to have a signature pushed out that OWASP top ten vulnerability you discovered in your in-house web application or the exact signature for the bot-net that's credential stuffing your sign-in page. Making a custom signature is the quickest band-aid and I found the process to be a touch unintuitive (and buried deep in a bunch of menuts). I hope that I can save the next person with this question the pain of digging through all of the documentation to parse out the particulars.

So here goes:

### 1) Make a new signature

First hit the new attack signature creation screen by going to Security > Options > Application Security > Attack Signatures > Attack Signature List and hitting the plus button. (See! Starting out totally intuitive 5 levels down </sarcasm>)

![5 menus down](https://blog.benjamin-hering.com/images/F5-ASM-signatures/attack-signatures-list-menu.png)

Anyway, once you get here you'll get the new attack creation screen. Name and Rule are important and required, the rest seems to be helpful tagging for sorting rules. I'll circle back to the meat of the rule later. Right now we just need to plumb in the connection so I'll drop in a super simple rule to test. content keyword matches anywhere in the request - URL, headers, parameters, whatever - for the string I put after it. I'll have it look for a super bad thing.

![New Attack Signature](https://blog.benjamin-hering.com/images/F5-ASM-signatures/new-attack-signature-creation.png)

### 2) Make a signature set

There's a few ways to get this to signature applied to your policy. If you set the "Systems" to include "Linux" for example, and your ASM policy already has a filter based signature set that includes "Linux" you're all good. For my super specific custom signatures, I find it simpler to keep track of everything by keeping the custom signatures in their own set. I organize these signature sets by having one custom signature set applied to every ASM policy (global custom set) and another custom signature set per ASM policy (to apply to just a single policy)

Make a new set by going to Security > Options > Application Security > Attack Signatures > Attack Signature sets and hitting the plus button.

![5 menus down, again!](https://blog.benjamin-hering.com/images/F5-ASM-signatures/attack-signature-sets-menu.png)

Once you're here, set the "Type" to manual and add your new custom signature to the signature list at the bottom

![New Attack Signature Set](https://blog.benjamin-hering.com/images/F5-ASM-signatures/new-attack-signature-set.png)

### 3) Add the signature set to your ASM policy

