---
layout: post
published: true
title: Handy GitHub Workflow Tricks
---
I went through [this course](https://www.safaribooksonline.com/library/view/mastering-github/9781771376082/) recently and learned some handy GitHub workflow tricks. Here are the most useful ones I found.

## Visualizing diffs

GitHub URLs are very flexible for visualizing diffs in your projects. Below are a few ways to do this.

### Diffs between two tags

This URL shows how to compare the diff between two git tags: [https://github.com/sinatra/sinatra/compare/0.9.4...1.0.a](https://github.com/sinatra/sinatra/compare/0.9.4...1.0.a)

![]({{site.cdn_path}}/2017/08/25/diff_tags.png)

### Diffs between dates

This URL shows how to compare the master branch to how it looked 1 month ago: [https://github.com/sinatra/sinatra/compare/master@%7B1month%7D...master](https://github.com/sinatra/sinatra/compare/master@{1month}...master)

![]({{site.cdn_path}}/2017/08/25/diff_dates.png)

### Exclude whitespace

Passing "w=1" as a URL parameter to the diff compare URL causes it to exclude whitespace commits. This makes visualization much cleaner when simple code formatting changes were made in addition to functional changes. This parameter can also be used on pull request pages.

Before "w" option:
![]({{site.cdn_path}}/2017/08/25/before_-w.png)

after "w" option:
![]({{site.cdn_path}}/2017/08/25/after_-w.png)

## Direct URLs for forking repos

Appending "/fork" onto the repo URL for any repo will take you to the "fork repo" dialog page. It's a little thing, but can speed up workflow or instructions that involve having others fork a repo.

Example: [https://github.com/sindresorhus/refined-github/fork](https://github.com/sindresorhus/refined-github/fork)

## Public keys

Instantly view the public keys a user has uploaded by appending ".keys" to their profile URL. One use case for this would be for DevOps to automate provisioning of SSH access to systems.

Example: [https://github.com/davidmerrick.keys](https://github.com/davidmerrick.keys)

## Reference

* [Mastering GitHub](https://www.safaribooksonline.com/library/view/mastering-github/9781771376082/)
* [GitHub Cheat Sheet](https://github.com/tiimgreen/github-cheat-sheet)
