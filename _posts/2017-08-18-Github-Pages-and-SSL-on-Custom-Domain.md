---
layout: post
title: The road to SSL
category: blog
tags: ssl https http cloudflare letsencrypt githubpages hosting secure certificate
excerpt: Migrate my personal blog pages, hosted on GitHub Pages, to https using ssl certificate
---

One of these days I started the long road to the SSL migration in my personal blog (yes, this one). 
I have read quite a few articles (blog posts) on this subject (especially some articles that describe the stackoverflow.com migration). I started to investigate what I could do in a scenario like mine (Github Pages) and then I did some case work, first I was seeing the certificate providers, in my case the budget is not so much, not to say that there is no budget available for this little project. So only 2 alternatives have remained: [Cloudflare](https://www.cloudflare.com/) and [letsencrypt.org](https://letsencrypt.org/). In my case, this page is available by github pages, so I chose to use the cloudflare service to enforce the ssl certificate and since I use the service, I also created a Cloudflare certificate and applied it to this web page.

### Steps

I have found these [instructions](https://gist.github.com/cvan/8630f847f579f90e0c014dc5199c337b) from [cvan](https://github.com/cvan/) on how to achieve this.


1.<strike>Register a domain name.</strike><br />
2.I Signed up for CloudFlare and I created an account for my domain and followed the steps in the wizard.<br />
3.In my domain admin page I pointed the namservers to CloudFlare.<br />
4.As I don't have one certificate, I created a Shared Certificate (from CloudFlare) and I used it in my CloudFlare account.<br />
5.From the CloudFlare settings for that domain, enable HTTPS/SSL and set up a Page Rule to force HTTPS redirects.<br />
6.<strike>Create a new repository on GitHub to store your site's contents.</strike><br />
7.<strike>Create a CNAME record to point domain.tld to user.github.io.</strike><br />
8.<strike>In your Github repo, create a file at the root called CNAME containing the domain name.</strike><br />


### Configurations

![_config.yml]({{ site.baseurl }}/images/cloudflare_certificates.png)

Ok! After following this steps, and after releasnig all the cache in my browser (belive me it storesa a lot of cache) and after wayting the DNS servers to release all the cache, well, all my traffic was under ssl (https). But yet I didn't saw the green icon instead it was some exclamation mark signal. Well I had some "mixed content", in some places of my web page, in menu urls and in some images references I was referencing the full http path, then I started to "clean" all the links, first if it was an external link, I need to know if I could use the https version, ok, no problem there! Then I fixed the local links, not to be a full path, but I changed them to be relative paths.

![_config.yml]({{ site.baseurl }}/images/secure_ssl.png)

After that I tested the access to my page in several devices and in several ISP providers, everything looks fine an know I can see the "green light" in the url marking the ssl usage.

![_config.yml]({{ site.baseurl }}/images/certificate.png)

At this point my personal page (this one) is served under https secure connection, hosted by github pages and protected by Cloudflare services. Hope it can be used as an example by anyone else.

Bye bye!

