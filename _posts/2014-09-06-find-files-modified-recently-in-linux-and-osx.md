---

published: true
title: Find files modified recently in Linux and OSX
---
The "find" command is very flexible, powerful, and worth knowing whether you administer UNIX-based systems or are just a power user.

To find files modified in the past 7 days, execute this command:

{% highlight shell %}
find ./ -type f -mtime -7
{% endhighlight %}
