---
layout: post
published: true
title: 'jQuery: make selection from sub-tree'
tags: javascript
---

By default, jQuery selectors operate on all items in the DOM. There is an overloaded search function, however, that allows the creation of selectors based on a subtree.

{% highlight javascript %}
$("selector", "subtree element")
{% endhighlight %}

This will search for elements that match the selector and are contained within the subtree element.
