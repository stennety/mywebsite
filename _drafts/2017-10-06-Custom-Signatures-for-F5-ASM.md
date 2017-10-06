---
layout: post
title: Custom Signatures for F5 ASM
---

So F5's documentation is pretty amazing and the automatic updates to the ASM signature set has taken care of 95% of the security issues that I've encountered so far. The last time that Apache Struts had a public exploit (the same vulnerability [at the root of the Equifax breach](https://www.bleepingcomputer.com/news/security/equifax-confirms-hackers-used-apache-struts-vulnerability-to-breach-its-servers/)) it was great to log on and see that it was [just blocked by the existing ruleset](https://devcentral.f5.com/articles/apache-struts-remote-code-execution-vulnerability-cve-2017-5638-25617).

But there's always going to be times where something bad is something unique to your environment. There's no reason to expect F5's security folks to have a signature pushed out that OWASP top ten vulnerability you discovered in your in-house web application or the exact signature for the bot-net that's credential stuffing your sign-in page. Making a custom signature is the quickest band-aid and I found the process to be a touch unintuitive. I hope that I can save the next person with this question the pain of 