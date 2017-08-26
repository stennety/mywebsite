---

published: true
title: Configuring MiniDLNA on FreeNAS
---
I was looking for a guide on how to do this, and the one that finally worked for me was found [here](http://www.overclock.net/t/1424351/freenas-9-1-setup-guide). I copied it for reference and made a few minor corrections.

1. Click on the "Plugins" tab on the top of screen.
2. Click on "DLNA/UPnP."
3. Click "Install".
4. A box should pop up and then click OK.
5. After done installing, click on Jails on top of screen.
6. Click on Jails on top of screen next to Plugin.
7. Select dlna_1.
8. Click Add Storage on bottom of screen.
9. Under Source, Browse for the location you have your all your media stored and select it.
10. Under Destination, Browse for the Media folder and select it.
11. Click OK.
12. On the left side of screen, expand Plugins.
13. Click on MiniDLNA
14. Under Friendly name, name what you want to call your DLNA server.
15. Browse for Media in the Media directory
16. Checkmark Rescan on (re)start.
17. Click OK.
18. Click on Plugins on top of the screen again.
19. Slide the slider next to the plugin MiniDLNA to ON, if not on.
Now you should be able to access your media in WMP and any other device that is DLNA certified.
Note: If you do not see your media, just turn the plugin off and back on again.
