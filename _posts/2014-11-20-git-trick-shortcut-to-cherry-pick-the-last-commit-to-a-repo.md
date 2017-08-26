---

published: true
title: 'Git trick: shortcut to cherry-pick the last commit to a repo'
---
I discovered a handy git command on accident recently that allows you to cherry-pick the most recent commit to a repo. It's as easy as:

{% highlight shell %}
git cherry-pick -
{% endhighlight %}

Yep, that's literally it. No need for a commit hash.
