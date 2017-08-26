---

published: true
title: How to cleanly construct HTML with jQuery
---
If you're in a position where you need to construct HTML entities using jQuery, and you want it to be readable, you can make use of arrays to do this. For example:

{% highlight javascript %}
this.$fixture = $([
  "<div>",
  "  <div class='js-alert-box'></div>",
  "  <form id='my-form-to-validate'>",
  "    <input id='login-username' name='login-username'>",
  "  </form>",
  "</div>"
].join("\n"));
{% endhighlight %}
