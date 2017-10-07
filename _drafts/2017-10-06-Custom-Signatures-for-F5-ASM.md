---
layout: post
title: Custom Signatures for F5 ASM
---

So F5's documentation is pretty amazing and the automatic updates to the ASM signature set has taken care of 95% of the security issues that I've encountered so far. The last time that Apache Struts had a public exploit (the same vulnerability [at the root of the Equifax breach](https://www.bleepingcomputer.com/news/security/equifax-confirms-hackers-used-apache-struts-vulnerability-to-breach-its-servers/)) it was great to log on and see that it was [just blocked by the existing ruleset](https://devcentral.f5.com/articles/apache-struts-remote-code-execution-vulnerability-cve-2017-5638-25617).

But there's always going to be times where something bad is something unique to your environment. There's no reason to expect F5's security folks to have a signature pushed out that OWASP top ten vulnerability you discovered in your in-house web application or the exact signature for the bot-net that's credential stuffing your sign-in page. Making a custom signature is the quickest band-aid and I found the process to be a touch unintuitive (and buried deep in a bunch of menus). I hope that I can save the next person with this question the pain of digging through all of the documentation to parse out the particulars. 

So here goes:

## Setting up a new signature

### 1) Make a new signature

(Note, this is on BIG-IP version 12. Things may change for later versions.)

First hit the new attack signature creation screen by going to Security > Options > Application Security > Attack Signatures > Attack Signature List and hitting the plus button. (See! Starting out totally intuitive 5 levels down < /sarcasm>)

![5 menus down](https://blog.benjamin-hering.com/images/F5-ASM-signatures/attack-signatures-list-menu.png)

Anyway, once you get here you'll get the new attack signature creation screen. Name and Rule fields are important and required, the rest seems to just be helpful tagging for sorting rules and not for the actual evaluation of malicious requests. I'll circle back to the meat of the rule syntax later in this post. Right now we just need to plumb in the connection so I'll drop in a super simple rule to test. content keyword matches anywhere in the request - URL, headers, parameters, whatever - for the string I put after it. I'll have it look for a super bad thing.

![New Attack Signature](https://blog.benjamin-hering.com/images/F5-ASM-signatures/new-attack-signature-creation.png)

### 2) Make a signature set

There's a few ways to get this to signature applied to your policy. If you set the "Systems" to include "Linux" for example, and your ASM policy already has a filter based signature set that includes "Linux" you'll get your custom signature automatically added. For my super specific custom signatures, I find it simpler to keep track of everything by keeping the custom signatures in their own set. I organize these signature sets by having one custom signature set applied to every ASM policy (global custom set) and another custom signature set per ASM policy (to apply to just a single policy)

Make a new set by going to Security > Options > Application Security > Attack Signatures > Attack Signature sets and hitting the plus button.

![5 menus down, again!](https://blog.benjamin-hering.com/images/F5-ASM-signatures/attack-signature-sets-menu.png)

Once you're here, set the "Type" to manual and add your new custom signature to the signature list at the bottom

![New Attack Signature Set](https://blog.benjamin-hering.com/images/F5-ASM-signatures/new-attack-signature-set.png)

### 3) Add the signature set to your ASM policy

Go to the list of attack signature sets that are enforced by your policy by going to Security > Application Security > Policy Building > Learning and Blocking Settings

![Learning and Blocking Settings](https://blog.benjamin-hering.com/images/F5-ASM-signatures/learning-and-blocking-settings-menu.png)

Once in the Learning and Blocking settings section, you can then expand the Attack Signatures section to see what signature sets are applied, and hit the "change" button to modify them

![Change Signature Sets](https://blog.benjamin-hering.com/images/F5-ASM-signatures/change-signature-sets.png)

Then hit the checkbox next to the custom signature set you created to assign it to this policy.

![Select Signature Sets](https://blog.benjamin-hering.com/images/F5-ASM-signatures/select-signature-sets.png)

With any change to the policy, it won't actually push the changes live until you hit the "Apply Policy" button on the top of the screen

![Apply Policy](https://blog.benjamin-hering.com/images/F5-ASM-signatures/apply-policy-changes.png)

### 4) And double check if it's in staging

By default (depending on how you put together your ASM security policy) new rules start out as being added in staging mode. It's a good safety measure to sanity check whether or not the new rule is going to block false positives by having things start out in this notify only, no block mode. However, if this is a custom signature to patch an immediate problem, waiting a week or so to go through the standard traffic learning process before dropping into blocking mode is probably too long. 

To take this signature out of staging and have it start to block stuff, go to Security > Application Security > Attack Signatures

![Attack Signature](https://blog.benjamin-hering.com/images/F5-ASM-signatures/attack-signatures-menu.png)

Once there, search for your custom rule and whether or not it's in staging mode will be immediately apparent.

![Signature in Staging](https://blog.benjamin-hering.com/images/F5-ASM-signatures/signature-in-staging.png)

To take a signature out of staging, simply select it with the checkbox and hit "enforce." Again, with any change to the policy, you'll need to hit the "Apply Policy" button to push your changes.

![Apply Policy](https://blog.benjamin-hering.com/images/F5-ASM-signatures/apply-policy-changes.png)

## Custom Signature Rules Syntax

So we now have a custom rule-set that will block if the string 'super-bad-thing' is anywhere in the request. 

It'll block it if it's in the URI

```
$ curl -A 'taco' http://test.benjamin-hering.com/super-bad-thing
Request Rejected - The requested URL was rejected. Please consult with your administrator. Your support ID is: 7446681583521759913
```

Or a query parameter

```
curl -A 'taco' http://test.benjamin-hering.com?foo=super-bad-thing
Request Rejected - The requested URL was rejected. Please consult with your administrator. Your support ID is: 7446681583511985816
```

Or a header

```
$ curl -v -A 'taco' -H "foo: super-bad-thing" http://test.benjamin-hering.com
* Rebuilt URL to: http://test.benjamin-hering.com/
*   Trying 10.130.25.100...
* TCP_NODELAY set
* Connected to test.benjamin-hering.com (10.130.25.100) port 80 (#0)
> GET / HTTP/1.1
> Host: test.benjamin-hering.com
> User-Agent: taco
> Accept: */*
> foo: super-bad-thing
>
< HTTP/1.1 200 OK
< Cache-Control: no-cache
< Connection: close
< Pragma: no-cache
< Content-Type: text/html; charset=utf-8
< Content-Length: 130
<
* Closing connection 0
Request Rejected - The requested URL was rejected. Please consult with your administrator. Your support ID is: 744668158351198637
```

Note, that I'm setting the User-Agent to "taco" as the default ASM ruleset includes a signature to block automated access from curl based off of user-agent. And hey, who doesn't like the idea of tacos accessing their website?

That's a pretty broad search space and as a general rule it's a good idea to have these signatures as targeted as you can to avoid false positives. Let's say that the issue here is only "super-bad-thing" showing up in the URI. ASM signatures have narrower keywords to search than just all of the content of the request.

| Keyword       | Use                                                                                                                                                                                                                                                                                                                                                                                                                                 |
|---------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| content       | Matches the full content.                                                                                                                                                                                                                                                                                                                                                                                                           |
| uricontent    | Matches the URI, including the query string (unless using the objonly modifier).                                                                                                                                                                                                                                                                                                                                                    |
| headercontent | Matches the HTTP header.                                                                                                                                                                                                                                                                                                                                                                                                            |
| valuecontent  | Matches an alphanumeric user-input parameter (or an extra-normalized parameter,,if using the norm modifier); used for parameter values, XML,objects, JSON/GWT objects, XML/JSON parameters, and cookies. When a signature,includes the valuecontent keyword, XML payloads are,examined.,Note: The valuecontent parameter,replaces the paramcontent parameter that was used in Application Security Manager™ versions prior to 10.0. |
| reference     | Provides an external link to documentation and other information for the,rule.                                                                                                                                                                                                                                                                                                                                                      |

### A little smaller scope

So let's try this a little smaller. Let's move this to just scanning the URI without any query strings. That would look like.

![URI only](https://blog.benjamin-hering.com/images/F5-ASM-signatures/signature-uri-only.png)

The "objonly" addition means just check the URI and not the query parameters. "nocase" lets the search be cases insensitive, "suPer-bad-thing" will still get blocked in the URI. For example:

```
$ curl http://test.benjamin-hering.com/suPer-bad-thing
Request Rejected - The requested URL was rejected. Please consult with your administrator. Your support ID is: 7446681583521853489
```

But with the narrower scope, query parameters are no longer checked. For example:

```
$ curl http://test.benjamin-hering.com?foo=super-bad-thing
<!DOCTYPE html>
<html lang="en" xml:lang="en" >
<head>
...
```

### But not if this happens

Great. So we have the smaller scope to search for the malicious signature against, but sometimes the business logic requires exceptions. Let's say that we want to make sure that we're blocking the "super-bad-thing" but we still want to bypass this signature for our internal testing. And we happen to know that only people internal to the team would ever use the "taco" user agent for requests. Let's carve out an exception. 

Fortunately, the ASM rule generation allows for negation via a "not" character (!).

So a first stab at that exception might look like adding a keyword search against the header content. Maybe a rule that looks something like:

```
uricontent:"super-bad-thing"; objonly; nocase;
headercontent:!"User-Agent: taco";
```

### But wait, character escapes!

So logically that all looks good, but there's a certain sub-set of characters that ASM rules can't directly process. Specifically, You must escape the following characters when using them in a keyword argument:

    Colon (:)
    Semicolon (;)
    Double quotation mark (")
    Backward slash (\)
    Pipe (|)
    All binary characters (not ASCII-printable characters), including:
        ASCII 0x00 through 0x1F
        ASCII 0x7F through 0xFF
    The space character (ASCII 0x20)

And our headercontent keyword search has a colon for separating the header name from its value. Escaping characters in ASM rules looks like

```
|character in hex|
```
So for example:

```
: is |3a|
; is |3b|
```
So our new rule looks like:

```
uricontent:"super-bad-thing"; objonly; nocase;
headercontent:!"User-Agent|3a| taco";
```

And the "not" behavior plus some character escaping gives us the exception behavior we want. Block any request with the string "super-bad-thing" in the URI, regardless of capitalization.

```
$ curl -A "foo" http://test.benjamin-hering.com/suPer-bad-thing
Request Rejected - The requested URL was rejected. Please consult with your administrator. Your support ID is: 7446681583512051144[master]
``` 
Unless the user agent is set to "taco"

```
$ curl -v -A "taco" http://test.benjamin-hering.com/suPer-bad-thing
*   Trying 10.130.25.100...
* TCP_NODELAY set
* Connected to test.benjamin-hering.com (10.130.25.100) port 80 (#0)
> GET /suPer-bad-thing HTTP/1.1
> Host: test.benjamin-hering.com
> User-Agent: taco
> Accept: */*
>
< HTTP/1.1 404 Not Found
< Set-Cookie: lc.cid=dc9d2f3e-0c64-4af2-bca8-5ac43031c37a; Max-Age=31556952; Path=/; Expires=Sun, 07 Oct 2018 07:18:23 GMT; HttpOnly; Secure
< Set-Cookie: hs_v2=WebsiteRedesignPublicRedirects_Nov2016.402.website-redesign-experience; Max-Age=7776000; Path=/; Expires=Fri, 05 Jan 2018 01:29:11 GMT; HttpOnly
< corrId: 3a08817f-605b-4d27-ae15-2a49600d73bc
< clientId: 21aab18320dc4d2bbd8040abf54bec4ae4eb2aa6
< cache-control: no-store, no-cache, max-age=0, must-revalidate
< X-XSS-Protection: 1; mode=block
< X-FRAME-OPTIONS: SAMEORIGIN
< P3P: ABCDEF
< Content-Security-Policy: frame-src 'self' view.ceros.com; font-src 'self' data:; script-src 'unsafe-inline' 'self' js-agent.newrelic.com bam.nr-data.net static.lendingclub.com 'unsafe-eval' heapanalytics.com static-demo.tlcinternal.com tags.tiqcdn.com cdn.heapanalytics.com demo.tlcinternal.com; media-src static-demo.tlcinternal.com; default-src 'self' static.lendingclub.com; img-src * data:; connect-src 'self' js-agent.newrelic.com bam.nr-data.net heapanalytics.com; style-src 'unsafe-inline' 'self' c.comenity.net heapanalytics.com
< Content-Type: text/html; charset=utf-8
< Content-Length: 44323
< ETag: W/"ad23-rCJ7OB2avhFuA6x+imyliS8zfjI"
< Date: Sat, 07 Oct 2017 01:29:11 GMT
< Set-Cookie: TS0180f924=013c03067266a96fe58084219a56a9a231174ab3af3f1de89bae1077bd9ed6fbfa834b61964608f539ebe2edb00d0e6a94b94265ee6e6f16422c521dc567274b500ee00c391ecf1331a3fcf6ccbb3abde1b3cc2357; Path=/
<
<!DOCTYPE html>
<html lang="en" xml:lang="en" >
<head>
...
```

And there you have it. 50 clicks, 20 different sub-menus deep, and 15 thousand characters later we have a very basic ASM signature with a little bit of if/then logic built in. We haven't even touched RegEx signatures yet!