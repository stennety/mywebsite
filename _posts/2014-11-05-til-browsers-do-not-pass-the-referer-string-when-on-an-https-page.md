---

published: true
title: 'TIL: Browsers do not pass the referer string when on an HTTPS page'
---
The HTTP Referer (originally a misspelling of "referrer") header field identifies the address of a web page that linked to the resource being requested. It is a widely-used feature around the Web that is often used for analytics (in particular, identifying where a website's traffic has come from).

I learned recently that browsers do not pass the Referer header field when following a link from an HTTPS page. This breaks several things that rely on this string. This has been especially problematic for internet marketing affiliate campaigns that pay based on the number of referrals from a certain website. Without the Referer header, there is no way for the destination site to know where those visitors came from.

Why is this the case?

Browsers appear to be adhering to [this RFC](http://www.w3.org/Protocols/rfc2616/rfc2616-sec15.html#sec15.1.3):

> Clients SHOULD NOT include a Referer header field in a (non-secure) HTTP request if the referring page was transferred with a secure protocol.

Fortunately, there is a fix. A new HTML5 meta tag directs browsers to pass referer information even on HTTPS sites.

{% highlight html %}
<meta name="referrer" content="always">
{% endhighlight %}

This header, however, isn't universally processed by browsers (yet). It's currently supported only on Chrome and Safari. Support in Firefox is in progress.

Reference: [http://smerity.com/articles/2013/where_did_all_the_http_referrers_go.html](http://smerity.com/articles/2013/where_did_all_the_http_referrers_go.html)

## Fun Fact: The Origin of Referer.

According to [this Wikipedia article](http://en.wikipedia.org/wiki/HTTP_referer):

> The misspelling referer originated in the original proposal by computer scientist Philip Hallam-Baker to incorporate the field into the HTTP specification.[2] The misspelling was set in stone by the time of its incorporation into the Request for Comments standards documentRFC 1945; document co-author Roy Fielding has remarked that neither "referrer" nor the misspelling "referer" were recognized by the standard Unix spell checker of the period.[3] "Referer" has since become a widely used spelling in the industry when discussing HTTP referers; usage of the misspelling is not universal, though, as the correct spelling of "referrer" is used in some web specifications such as the Document Object Model.
