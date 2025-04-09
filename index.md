---
layout: default
---

<div class="post-list">
  {% for post in site.posts %}
    <div class="post-card">
      <a href="{{ post.url }}">{{ post.title }}</a>
    </div>
  {% endfor %}
</div>
