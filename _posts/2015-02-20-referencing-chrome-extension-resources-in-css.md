---

published: true
title: Referencing Chrome Extension resources in CSS
---
For Chrome extension development, if you need to reference an image or other asset for your Chrome extension in CSS that's stored in the extension folder, just place this in your CSS selectors:

{% highlight javascript %}
url("chrome-extension://__MSG_@@extension_id__/images/image_name_here.jpeg")
{% endhighlight %}
