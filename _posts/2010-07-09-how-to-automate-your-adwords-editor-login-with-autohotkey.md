---

published: true
title: How to automate your Adwords Editor login with AutoHotkey
---
I love Adwords Editor, but I hate logging in every time I use it because my password is so long that I have to open a browser, log in to Lastpass, copy my password, and then paste it into the login box. I can understand the security considerations by Google, but still prefer to avoid tediousness and repetition when I'm trying to get work done. Here's my solution:

1. Download and install [Autohotkey](http://www.autohotkey.com/download/).
2. Create a new file on your Desktop called "AE.ahk".
3. Right-click the file and choose "Edit Script".
4. Paste this into the file and replace "your-password-here" with your Adwords password:
{% highlight java %}
^!s::
Send your-password-here
{% endhighlight %}
5. Close your text editor and double-click the script to run it. Now open Adwords Editor and press Ctrl-Alt-S when prompted for your password. You should see it typed automatically for you and be able to log in.
6. _Optional: To be more secure, copy this script to a USB drive on your keychain and only run it from there._
