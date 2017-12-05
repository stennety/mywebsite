---
published: false
title: Git Quirks
---
A list of git/GitHub quirks and edge cases I've come across.

# .gitignore doesn't ignore files that are already in your repo

Bizarrely enough, adding a file to your .gitignore _doesn't actually ignore the file_ if it's already in your git tree. So if you're wanting to ignore a file already there, make sure you `git rm -rf` it in conjunction with adding it to your .gitignore.

# Searching forked repos in GitHub

By default, [forks are not included in GitHub search](https://help.github.com/articles/searching-in-forks/). This can be super inconvenient/catch you off-guard if you're searching a private organization. To get around it, append `fork:true` to your query.
