---
ID: 68
post_title: 'Integration series: Messaging'
author: dreat
post_excerpt: ""
layout: post
published: true
post_date: 2017-03-26 20:50:50
---
<a href="http://dreat.info/2017-03-17-introduction-to-integration/">Last time</a> we spoke about some integration methods we can use.

As we see, there are methods that are not so tight coupled, being able to generate lots of little data packages (like file transfer), easily synchronizable (like shared database), details of storage's structure hidden from applications (unlike shared database) and being able to send data to invoke behavior in other app (like RPI) but with being resistant to failure (unlike RPI).

And here messaging comes to play. The rules are simple: you create message, send it to message channel and someone waiting for this kind of message will get it. While it has some problems on it's own, it is reliable, fequent, fast and asynchronous and.
<ol>
 	<li>Being asynchronous means you won't block process while waiting for the result/answer. Calling app can continue with it's work.</li>
 	<li>Decoupling. Messages will be sent to message channel without knowing almost anything about receiver. The common interface are the types of messages sent, not the bidings between apps. It also allows separation integration developement from application developement.</li>
 	<li>Frequent, small messages allow applications to behave almost immediatly by sending more messages.</li>
</ol>
And many more we'll explore in the series. Why I will write a series on it? The main disadvantage of messaging is the learning curve. While other methods are fairly easy to use, messaging and async thinking is not something we're used to. But once learned this concepts will help you not only when integrating lots of enormous applications. You can also apply it to "integrate" classes/functions/actors in your code.
