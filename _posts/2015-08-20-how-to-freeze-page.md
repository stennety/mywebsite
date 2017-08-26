---

title: How to freeze page Javascript execution in Chrome
published: true
tags: javascript
---

As a QA engineer, there are often times when I'll be working with dynamic elements on a page that disappear on mouse out. 
This can be extremely tedious to try to inspect these transient elements, and the only solution is to freeze the page. 
This can be done as follows:

* Open Chrome javascript console
* Go to "sources"
* On the right side, click the little "pause" icon, or press F8 to pause script execution.

Pressing F8 with the sources tab open was what worked best for me. Then you can switch to the Elements tab, click the magnifying glass icon, and inspect away.
