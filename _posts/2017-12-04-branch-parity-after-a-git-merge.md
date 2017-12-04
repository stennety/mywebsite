---
published: true
title: Branch parity after a git merge
---
Say you have a master branch, with file A and file B in it.

Create a feature branch off of master. Then, in master, change file A. In the feature branch, change file B. Merge the feature branch into master. Are the branches the same after the merge?

No, they are different. After the merge, the master branch will have the changes to both files A and B. The feature branch will only have the changes to file B.

![]({{site.cdn_path}}/2017/12/04/branches.png)
