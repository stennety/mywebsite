---
layout: page
title: About
permalink: /about/
---

The **Gaming Wiki Network** (GWN) was founded on October 21, 2022 by 11 members and 3 affiliates. GWN is a network of independently-hosted wikis about video game franchises and aims to support all gaming communities in building independently-hosted wikis. The GWN has [{{site.data.members.size}} members]({{site.baseurl}}/members) and [{{site.data.affiliates.size}} affiliates]({{site.baseurl}}/affiliates)

### Join us

If you have a wiki about video games that you think would be a good fit for the GWN, please do not hesitate to [get in touch]({{site.baseurl}}/join)!

### A brief history

{% for event in site.data.history reversed %}
- **{{event.date}}**: {% if event.url %}[{{event.description}}]({{event.url}}){% else %}{{event.description}}{% endif %}
{% endfor %}
