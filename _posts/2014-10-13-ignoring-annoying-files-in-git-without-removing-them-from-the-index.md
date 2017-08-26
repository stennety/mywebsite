---

published: false
title: Ignoring annoying files in Git (without removing them from the index)
---
I have a few git repositories that I make changes to for work. When adding files to the staging area with "git add .", sometimes there are extraneous XML files that get added that I don't want there. I don't want to do a "git rm," however, because that would remove the file from the repository. How to solve this conundrum? "git update-index" to the rescue.

{% highlight shell %}
git update-index --skip-worktree <file or folder name>
{% endhighlight %}

This sets a flag in git that tells it to pretend the object specified is up to date with the remote repository. This effectively removes the object from being picked up by a command like "git add ." while maintaining the file in the repo. For more information, visit [this section of the Git documentation](http://git-scm.com/docs/git-update-index).

To undo skipping the index on a file:

{% highlight shell %}
git update-index --no-skip-worktree <file>
{% endhighlight %}