---

published: true
title: Daemonizing a Python script
---
It's pretty straightforward to daemonize and communicate with a Python script using the PYRO (Python Remoting Objects) library. I found this example on StackOverflow recently and it worked for my purposes.

If you haven't already, setup pip. Then use it to install Pyro.

{% highlight shell %}
$ sudo apt-get install python-pip
$ sudo pip install pyro
{% endhighlight %}

To test the daemon, you'll need two scripts–a client and server. The server acts as the daemon and the client communicates with it.

Server.py:

{% highlight python %}
#!/usr/bin/python
import Pyro.core

class JokeGen(Pyro.core.ObjBase):
        def __init__(self):
                Pyro.core.ObjBase.__init__(self)
        def joke(self, name):
                return "Sorry "+name+", I don't know any jokes."

Pyro.core.initServer()
daemon=Pyro.core.Daemon()
uri=daemon.connect(JokeGen(),"jokegen")

print "The daemon runs on port:",daemon.port
print "The object's uri is:",uri

daemon.requestLoop()
{% endhighlight %}

Client.py:

{% highlight python %}
#!/usr/bin/python

import Pyro.core

# you have to change the URI below to match your own host/port.
jokes = Pyro.core.getProxyForURI("PYROLOC://localhost:7766/jokegen")

print jokes.joke("Irmen")
{% endhighlight %}

[via [http://stackoverflow.com/questions/656933/communicating-with-a-running-python-daemon](http://stackoverflow.com/questions/656933/communicating-with-a-running-python-daemon)]
