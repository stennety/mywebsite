---
published: true
title: How to make a repository read-only in Sonatype Nexus 2
---
I'm posting this because it wasn't immediately obvious in a Google search how to do this, so I thought it might be helpful for others.

For reference, I'm using Nexus OSS 2.14.11-01, so ymmv, but it should be similar.

First, go to the repositories list page (in the sidebar, drop down "Views/Repositories" and click "Repositories").

Click the name of the repository you're interested in.

![]({{site.cdn_path}}/2019/01/28/repository-list.png)

This will open up a panel at the bottom of the page. Click the "Configuration" tab. In the "Deployment Policy" field, select "Read Only." 

![]({{site.cdn_path}}/2019/01/28/read-only.png)

Finally, be sure to save your changes by clicking "Save" at the bottom of the form.
