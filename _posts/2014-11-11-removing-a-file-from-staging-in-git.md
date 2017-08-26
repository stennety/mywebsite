---

published: true
title: Removing a file from staging in git
---
If you have an unwanted file that is staged for commit, but you want to preserve your changes to it for committing later, execute this command:

{% highlight shell %}
git reset HEAD <filename>
{% endhighlight %}

Your modifications to the file will be preserved but will not be staged for commit. Check this using "git status."
