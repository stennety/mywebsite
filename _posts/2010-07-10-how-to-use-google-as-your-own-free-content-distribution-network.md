---

published: true
title: How to use Google as your own free content distribution network
---
With prices falling on hosting costs and Google placing more SEO value on  site load speed, Content Distribution Networks (CDNs) are rapidly becoming more relevant and practical. In this article, I'll show you how to leverage Google's App Engine servers into **your own free CDN!**

## What is a CDN?

Wikipedia is a great resource for reading more about [CDNs](http://en.wikipedia.org/wiki/Content_delivery_network), but the way that they work is to basically keep a copy of your site or your site elements (images, scripts, css, etc) on several servers around the world. When a visitor arrives at your site, the CDN determines their location and loads the files from the nearest server. This helps to:

* Massively boost your site's load speed.
* Take the demand off your server by acting as a reverse proxy.
* Increase your SEO ranking, because Google is placing more value on load speed.

## Why the Google App Engine?

For 3 reasons:

1. Google provides developers the capacity for creating 8 applications on their platform. Each of these has a quota for free bandwidth that tops out at 1gb up and 1gb down per day. This is far more than most site owners will ever use (and if you need more, you can purchase boatloads more from Google on the cheap), for free!
2. A proxy app called mirrorrr was written a couple of years ago that is perfect for tweaking into a reverse proxy. Once uploaded to Google Apps, it will load from Google's CDN by default.
3. The icing on the cake is that Google allows you to map any app to your own domain. So instead of "david-cdn.appspot.com," my CDN runs on "cdn.davidmerrick.me"  (On top of other things, this makes it appear as though my network and site are much larger and more legit!).

## How do we do this?

It's very easy to do because I've done most of the work. So, after a couple tweaks, this should take you about 10 minutes to do–no programming necessary. Note: I am presuming you're using WordPress for your site.

1\. Follow these instructions on [how to setup your own web proxy server](http://www.labnol.org/internet/setup-proxy-server/12890/), but before you upload the app to your developer account, modify the "mirrorrr.py" file's code by adding the bold text below to represent your website's URL:

{% highlight python %}
if base_url in MIRROR_HOSTS:
      logging.warning('Encountered recursive request for "%s"; ignoring',
                      mirrored_url)
      return None
    logging.debug("Fetching '%s'", mirrored_url)
    try:
      response = urlfetch.fetch(mirrored_url)
    except (urlfetch.Error, apiproxy_errors.Error):
      logging.exception("Could not fetch URL")
      return None
    if base_url != "your-url-here.com":
		return None
{% endhighlight %}

(This will restrict anyone from accessing anything except for your domain with this proxy, which conserves your bandwidth quota).

2\. To get WordPress to load all scripts and CSS from the CDN is a simple process. If you're using the Thesis theme, just add the following to your custom_functions.php file (be sure to change the bold text to represent your URLs). If you're not using Thesis, just use the functions.php file in your current theme's directory.

{% highlight php %}
function check_cdn_exclude($url) { //Exclude your admin pages from your CDN
	$my_cdn_excludes = array('wp-admin');
	$ref = $_SERVER["HTTP_REFERER"];
	foreach ($my_cdn_excludes as $exclude){
		if (preg_match("/{$exclude}/", $url)>0) return true;
		if (preg_match("/{$exclude}/", $ref)>0) return true;
	}
	return false;
}

function filter_cdn_elements($url) {
	if(!preg_match("/AppEngine\-Google/", $_SERVER['HTTP_USER_AGENT'])){ //To prevent recursion from CDN redirecting to itself
		$my_cdn_old_urls = "your-url-here.com";
		$my_cdn_new_urls = "your-google-apps-url-here.com/" . $my_cdn_old_urls;
		if (check_cdn_exclude($url) ) return $url;
			$url = preg_replace("/{$my_cdn_old_urls}/", $my_cdn_new_urls,$url, 1);
	}
	return $url;
}
add_filter('style_loader_src','filter_cdn_elements');
add_filter('script_loader_src','filter_cdn_elements');
add_filter('theme_root_uri','filter_cdn_elements');
{% endhighlight %}

3\. Optional: To map the CDN to your own domain, follow [these instructions](http://www.google.com/support/a/bin/answer.py?hl=en-in&answer=61057) (If you look at my source HTML, I have mine mapped to "cdn.davidmerrick.me").

And you're done! If you have any questions, comments, tips, etc., leave them below! _Note: I realize that this script doesn't load images._ Once I figure out how to hack the WordPress API a little better to add that feature, I will add it to this post.
