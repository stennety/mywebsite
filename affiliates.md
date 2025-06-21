---
layout: page
title: Affiliates
permalink: /affiliates/
---
We have {{site.data.affiliates.size}} affiliates at present. Our affiliates consist of high-quality wikis, wiki networks and websites. Please find a listing of our current affiliates below. If you think your wiki or website would be a good fit for affiliation with us, [reach out]({{site.baseurl}}/join)!

<table>
{% for affiliate in site.data.affiliates %}
 <tr>
  <td width="20%" style="text-align: center;">
   <img src="{{affiliate.logo}}" alt="{{affiliate.name}}">
  </td>
  <td>
    <a href="{{affiliate.url}}">{{affiliate.name}}</a><br>{{affiliate.description}}
    {% if affiliate.discord or affiliate.twitter or affiliate.instagram or affiliate.facebook %}
        <br>
    {% endif %}
    
    {% if affiliate.discord %} 
        <a title="Discord" href="https://discord.com/invite/{{ affiliate.discord }}"><i class="discord-icon discord"></i></a>
    {% endif %}
    
    {% if affiliate.facebook %} 
        <a title="Facebook" href="https://facebook.com/{{ affiliate.facebook }}"><i class="discord-icon facebook"></i></a>
    {% endif %}
    
    {% if affiliate.instagram %} 
        <a title="Instagram" href="https://instagram.com/{{ affiliate.instagram }}"><i class="discord-icon instagram"></i></a>
    {% endif %}
    
    {% if affiliate.twitter %} 
        <a title="Twitter" href="https://twitter.com/{{ affiliate.twitter }}"><i class="discord-icon twitter"></i></a>
    {% endif %}
  </td>
 </tr>
{% endfor %}
</table>
