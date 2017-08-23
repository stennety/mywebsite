---
layout: post
published: true
title: How to remove the .idea folder from git
---
If you've inadvertently committed the .idea folder to your git repo, and don't want it in there, it's an easy change to revert. 

_Note: These instructions should work for any JetBrains product--IntelliJ, WebStorm, etc._

1. Blacklist the .idea folder by adding the ".idea" folder to the .gitignore file in master, then commit this change.
2. In your branch, check this file out from master.
```git checkout master -- .gitignore```
3. Remove the .idea folder from the git tree

```git rm --cached -r .idea```

and commit this change to your branch.

## To restore your editor configs:

1. Use the PHPStorm registry to reveal the files:
https://stackoverflow.com/questions/33010238/show-idea-folder-in-phpstorm-project-tool-window
2. Right click the .idea folder, select “local history,” then revert back to an earlier working version.
