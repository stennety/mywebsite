---

published: true
title: 'VoIP hacks: how to spoof your caller ID as the White House''s phone number'
---
![]({{site.cdn_path}}/2010/05/30/ipfreely.jpg)

A fun prank is to call friends, family, or strangers from the White House's phone number (202-456-2121). The reason that this is possible is that Vonage, Skype, and other VoIP providers fundamentally must be able to fake caller ID in order to route calls from the Internet onto public phone networks.

## A Brief Technical Overview of Caller ID Spoofing:

What we'll do is register a free account at an ITSP, or Internet Telephony Service Provider, which acts as the bridge between the internet and the public American (or otherwise) analog telephony networks. We'll then configure the ITSP to use the White House's phone number as our outbound caller ID. Finally, we'll connect to the ITSP using a free VoIP client, or softphone, to make our call using a PC.

## The 10-Minute Step-by-Step Process:

1. Register a free account on [SIPGate.com](http://www.sipgate.com/).
2. Download [X-Lite](http://www.counterpath.com/x-lite.html), a free VoIP client.
3. Log in to SIPGate, then go to Settings–>Caller ID.
4. Enter 202-456-2121 as the Caller ID and click "Save."
5. Go back to your SIPGate Settings screen and click "SIP Credentials."
6. Leave that window alone for a moment.
7. Open X-Lite and go to Menu–>SIP Account Settings–>Add.
8. Use [these instructions](http://www.sipgate.com/faq/article/397/How_do_I_set_up_my_VoIP_device) to configure your SIP Account Settings on X-Lite using your SIP Credentials.
9. Dial any number and enjoy!
