---
published: true
title: Useful git hooks
---
[Git hooks](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks) are a useful way to add and customize git's behavior at different lifecycle phases (pre-commit, pre-push, etc).

Here are few hooks I use in my own workflow as a backend Kotlin dev. I've organized them by lifecycle phase.

# Pre-push

[Prevent pushing to master](https://ghost.org/changelog/prevent-master-push/). This adds a confirmation to your shell so you avoid shooting yourself in the foot if you didn't mean to push to master.

# Pre-commit

[ktlint](https://github.com/pinterest/ktlint/blob/master/ktlint/src/main/resources/ktlint-git-pre-commit-hook.sh). This runs the ktlint linter before every commit, so your formatting is cleaner.

# Sharing git hooks

The `.git` directory is not versionable, so hooks can't be pushed from there. This is by design, since you wouldn't want git to inadvertently run someone else's script on your machine.

You can, however, add your own `.githooks` directory, put your versioned hooks there, and then use a Makefile to initialize them. Thanks to [this post](https://www.viget.com/articles/two-ways-to-share-git-hooks-with-your-team/) for that idea.

```
init:
  git config core.hooksPath .githooks
```

Another option is to add an alias to your global git config:

```
[alias]
	inithooks = config core.hooksPath .githooks
```

## Global hook templates

Git has a feature that will copy files into your repo's `.git` folder on init. To configure this, edit your global git config to point the `templatedir` to your template directory.

```
[init]
	templatedir = ~/.dotfiles/git/templates
```

In this directory, create a folder called "hooks", and place your git hooks there. Whenever you clone or init a repo, they will be copied into the `.git` folder.