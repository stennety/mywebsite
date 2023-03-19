---
layout: page
title: About
permalink: /about/
---

The **Gaming Wiki Network**, or **GWN**, is a network of independently-hosted wikis about video game franchises. The GWN currently has [{{site.data.members.size}} members]({{site.baseurl}}/members) and [{{site.data.affiliates.size}} affiliates]({{site.baseurl}}/affiliates).

The GWN was founded on October 15, 2020 by Results May Vary aka RMV. RMV has been expelled for using derogatory language, general hostility, and malicious plotting against the NIWA Network. The GWN strongly condemns RMV's behavior, rejects any form of perceived affiliation with RMV, and disavows RMV's involvement in this organization.

### Join us

If you have a wiki about video games that you think would be a good fit for the GWN, please do not hesitate to [get in touch]({{site.baseurl}}/join)!

### A brief history

{% for event in site.data.history reversed %}
- **{{event.date}}**: {% if event.url %}[{{event.description}}]({{event.url}}){% else %}{{event.description}}{% endif %}
{% endfor %}
