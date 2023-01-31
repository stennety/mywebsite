---
published: true
title: Working with thread events in Python
---
I recently wrote a multithreaded download queue manager in Python. I had the actual file downloads running in its own thread. I only wanted the program to download during certain times of day, and decided to implement this functionality using thread events. I set up my threaded class method for downloading to accept a "stop\_event" parameter.

{% highlight python %}
def __download_files_thread(self, stop_event):
                while True:
                        while not stop_event.is_set():
                                self.download_files()
{% endhighlight %}

I then instantiated an event and passed it into the thread upon creation.

{% highlight python %}
dl_stop = threading.Event()
self.__dl_thread = threading.Thread(target=self.__download_files_thread, args={dl_stop})
{% endhighlight %}

This allowed me to control the behavior of the thread and get it to not download files during certain times.

{% highlight python %}
current_hour = time.strftime("%H")
if int(current_hour) == self.__dl_start_hour:
    # Generate stop event
    dl_stop.set()
elif int(current_hour) == self.__dl_end_hour:
    # Unset stop event
    dl_stop.clear()
{% endhighlight %}
