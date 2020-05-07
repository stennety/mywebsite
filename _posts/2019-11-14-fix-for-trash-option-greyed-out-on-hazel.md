---
published: true
title: Fix for "move to trash" option disabled in Hazel
---
I just started using [Hazel](https://www.noodlesoft.com/) to automate cleanup of my Mac. It worked great on my machine at home, but on my work MacBook Pro the trash icon was greyed out in the move window. 

![]({{site.cdn_path}}/2019/11/14/trash.png)

After Googling around for a bit, I learned that one reason this can happen is that the Trash can get corrupted. The fix is:

```
sudo rm -rf ~/.Trash
mkdir ~/.Trash
sudo chown $UID ~/.Trash
chmod u+rwx ~/.Trash
```

And now it works fine for me. Hopefully that solves it for you, too.
