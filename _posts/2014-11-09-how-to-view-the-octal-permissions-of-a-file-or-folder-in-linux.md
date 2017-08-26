---

published: true
title: How to view the octal permissions of a file or folder in Linux
---
{% highlight shell %}
stat -c "%a %n" <path to file or folder>
{% endhighlight %}

From the manpage of stat:

{% highlight shell %}
-c  --format=FORMAT
          use  the  specified  FORMAT instead of the default; output a newline after
          each use of FORMAT
%a     Access rights in octal
%n     File name
{% endhighlight %}

[via [http://askubuntu.com/questions/152001/how-can-i-get-octal-file-permissions-from-command-line](http://askubuntu.com/questions/152001/how-can-i-get-octal-file-permissions-from-command-line)]
