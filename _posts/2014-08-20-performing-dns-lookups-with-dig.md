---

published: true
title: Performing DNS lookups with Dig
---
My coworker was configuring a Windows Update server recently, and the domain was being blocked. We realized that there was a DNS entry that redirected Windows Update traffic to a local server. The way that we discovered this was with the Unix "dig" command.

{% highlight shell %}
$ dig any windowsupdate.com
{% endhighlight %}

![Screenshot-2014-08-20-09.19.43.png.jpg]({{site.cdn_path}}/2014/08/20/Screenshot-2014-08-20-09.19.43.png)

You can use dig to look up any type of DNS record, including CNAME, A, and MX records.

{% highlight shell %}
$ dig recordType windowsupdate.com
{% endhighlight %}

{% highlight shell %}
$ dig a windowsupdate.com
{% endhighlight %}

The analogous command on Windows is:

{% highlight shell %}
nslookup windowsupdate.com
{% endhighlight %}

NSLookup also works on Unix, but dig provides more information about a given domain.
