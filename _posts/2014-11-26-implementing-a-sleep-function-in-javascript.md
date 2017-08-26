---

published: true
title: Implementing a sleep() function in JavaScript
---

Note: usually, it's better to use an asynchronous function, like setTimeout(), because this function blocks execution until it's finished. That being said, sometimes you need to add a busy wait loop into your scripts. And this is how:

{% highlight javascript %}
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}
{% endhighlight %}

[Via [http://stackoverflow.com/questions/16873323/javascript-sleep-wait-before-continuing](http://stackoverflow.com/questions/16873323/javascript-sleep-wait-before-continuing)]
