---
layout: page
title: About
permalink: /about/
---

The **Gaming Wiki Network** (GWN) was founded on October 15, 2020 by Results May Vary whom has been expelled. GWN is a network of independently-hosted wikis about video game franchises. Originally with six wikis and three affiliates, the Gaming Wiki Network aims to support all gaming communities in building independently-hosted wikis. The GWN currently has [{{site.data.members.size}} members]({{site.baseurl}}/members) and [{{site.data.affiliates.size}} affiliates]({{site.baseurl}}/affiliates).

As of March 11, 2022, GWN has been led by new leadership comprised of various representative staff members from the member wikis of the GWN.

### Join us

If you have a wiki about video games that you think would be a good fit for the GWN, please do not hesitate to [get in touch]({{site.baseurl}}/join)!

### A brief history

{% for event in site.data.history reversed %}
- **{{event.date}}**: {% if event.url %}[{{event.description}}]({{event.url}}){% else %}{{event.description}}{% endif %}
{% endfor %}
