---
layout: post
published: true
title: Python class for TriMet train arrivals
tags: python
---
I wanted a Bash alias that would output the time remaining until the next Eastbound train at the stop near my apartment. I created a Python class to get this data that I could implement in a script. This class takes as parameters your TriMet API key and the ID of the stop. To obtain a TriMet API key, visit [http://developer.trimet.org/](http://developer.trimet.org/).

The data that the API returns is documented here: [http://developer.trimet.org/ws_docs/](http://developer.trimet.org/ws_docs/).

{% highlight python %}
#!/usr/bin/python

import urllib2
import json
import datetime
import math

class NextTrain:

	def __init__(self, stopID, apiKey):
		self.__stopID = stopID
		self.__apiKey = apiKey	

	def printNextArrival(self):
		base_url = "http://developer.trimet.org/ws/V1/arrivals?"

		response = urllib2.urlopen(base_url + "locIDs=" + str(self.__stopID) + "&appID=" + self.__apiKey + "&json=true")
		data = response.read()
		jsonData = json.loads(data)

		direction = jsonData["resultSet"]["location"][0]["dir"]
		firstResult = jsonData["resultSet"]["arrival"][0]
		station = jsonData["resultSet"]["location"][0]["desc"]
		trainType = firstResult["shortSign"]
		nextArrivalTime = datetime.datetime.strptime(firstResult["estimated"], "%Y-%m-%dT%H:%M:%S.000-0800")
		nowTime = datetime.datetime.now()
		timeRemaining = nextArrivalTime - nowTime
		print "Next " + direction + " train at " + station + ":"
		print str(int(math.floor(timeRemaining.total_seconds() / 60))) + " min"
		print trainType
		response.close()
{% endhighlight %}

Using this class:
{% highlight python %}
apiKey = "yourAPIKey"
stopID = integer_stop_id_here
nextTrain = NextTrain(stopID, apiKey)
nextTrain.printNextArrival()
{% endhighlight %}
