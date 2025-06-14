# How to create a post

Because the blog use [jekyll](http://jekyllrb.com/) every post is just a file in the `_posts` directory.

1. Create a new file in the `_posts` directory
2. The filename must have the format `date-title.md`, e.g.: `2021-10-13-example.md`
3. The content must start with a Front Matter, e.g.:
```
---
layout: post
title: Example
---
```
4. Write your content in [markdown](https://en.wikipedia.org/wiki/Markdown)
5. Commit the file via new branch and pull request to let someone review it before publishing
6. https://sharaal.github.io/ will be automatically updated after merging the pull request with the new post 

# Daily AI News

There is a GitHub Action which creates new draft articles for the "KI" topic on daily bases.

The workflow:
* Read all existing post and draft titles
* Fetch current "KI" news titles, but ignore the already existing
* For each title fetch an article including all sources
* Write a draft file

Langdock API Challenges:
* Web search is needed, so it was needed to use a temporary langdock assistent instead of the chat API
* The response is always AI generated text. Its not possible to fetch directly a valid JSON object. The prompt can say "give me a JSON object", but the AI mostly add e.g. explanation text or backtick blocks. So I request just a list each title starting with "- " and parse it on my own
