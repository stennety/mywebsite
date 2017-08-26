---

published: true
title: Bash shell script to check the stock price of a company
---
I wrote a quick little shell script this morning using the YAHOO Finance API to show the stock price of my company in the terminal. This works for any company that's publicly traded. Just change "JIVE" to your desired company's stock ticker code.

In ~/.bash_profile, I added a function to make the CURL request to the API:

{% highlight shell %}
function jive_stock() {
    curl -s 'http://download.finance.yahoo.com/d/quotes.csv?s=JIVE&f=l1'
}
{% endhighlight %}

(If you're on Linux, add this to your ~/.bashrc instead)

Below this, I added a bash alias to call the function. An alias is essentially a shortcut for a command.

{% highlight shell %}
alias jivestock=jive_stock
{% endhighlight %}

Now, reload ~/.bash_profile.

{% highlight shell %}
source ~/.bash_profile
{% endhighlight %}

And call your alias command.

{% highlight shell %}
$ jivestock
6.72
{% endhighlight %}
