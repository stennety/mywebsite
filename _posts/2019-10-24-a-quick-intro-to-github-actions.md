---
published: true
title: A Quick Intro to GitHub Actions
---
## Background

GitHub introduced the beta version of [Actions](https://github.com/features/actions) recently, aiming for a GA on November 13th at the time of this writing.

Actions provides a containerized environment for building CI/CD workflows and adding general automation around a project, similar to offerings from GitLab and CircleCI. The free tier is very generous, offering unlimited build minutes for open-source projects and 50,000 free minutes per month for enterprise customers. Actions are composable and reusable, and there are loads of useful [public ones](https://github.com/sdras/awesome-actions) available. One example is an Action that [auto-deletes merged branches](https://github-actions.netlify.com/a-branch-cleanup) (Note that GitHub recently released [a native feature for this](https://help.github.com/en/github/administering-a-repository/managing-the-automatic-deletion-of-branches)).

## Anatomy of an Action

A GitHub action is made up of jobs and steps. Jobs can be run in parallel or sequence, and can be configured to depend on the success of other jobs. A job has one or more steps. A step can be a predefined action, or a command to run.

![Screen Shot 2019-10-24 at 11.55.12 AM.png]({{site.baseurl}}/media/Screen Shot 2019-10-24 at 11.55.12 AM.png)

## Configuration

Actions are configured in the project itself in `.github/workflows/*.yml` files. As the asterisk implies, more than one Action can be created in a repo. The syntax for Actions is documented [here](https://help.github.com/en/github/automating-your-workflow-with-github-actions/workflow-syntax-for-github-actions#jobsjob_idenv).

Actions can be scheduled, or can be triggered by basically [any event](https://help.github.com/en/github/automating-your-workflow-with-github-actions/events-that-trigger-workflows) you can think of on GitHub. A push, a PR, a commit comment, etc can all be triggers. These triggers can be as granular as you want. For example, this event would trigger only when a PR is closed:

```yaml
on: 
  pull_request:
    types: [closed]
```

## Resources

I created a cheatsheet of useful syntax and snippets [here](https://gist.github.com/davidmerrick/15ec0d6cd8e6b25113aa16dd02cb8ea9).
