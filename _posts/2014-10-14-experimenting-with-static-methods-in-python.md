---

published: true
title: Experimenting with static methods in Python
---
I was writing a class to construct CURL requests in Python. I decided to experiment with making one of the methods static. To do this, simply place a "@staticmethod" decorator before the method declaration.

{% highlight python %}
class CurlCommand(object):
    'Class for constructing Curl Commands'

    @staticmethod
    def constructStatic(requestMethod, header, userName, passWord, url):
        command = "curl"

        # Username and password
        command = command + " -u " + userName + ":" + passWord

        # Header
        command = command + " --header " + "\'" + header + "\'"

        # Request method
        command = command + " -X " + "\"" + requestMethod + "\""

        # URL
        command = command + " " + url

        return command
{% endhighlight %}

The static method can then be called with:

{% highlight python %}
CurlCommand.constructStatic(requestMethod, header, userName, passWord, url)
{% endhighlight %}

Ultimately, I decided not to make this a static class, but no doubt I'll make use of this Python feature when it comes to constants and other constructs that it makes sense to use statically.
