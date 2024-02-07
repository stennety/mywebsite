---
layout: post
title: Algorithm and data struct
---

{% assign datas = site.data.AlgorithmAndDataStruct %}

{% for data in datas %}

  <!-- 목차 생성 -->
{{ data.Content }} {{ data.Name }}

  <!-- 내용 추가 -->
{% if data.Path %}
{% include {{data.Path}} %}
{% endif %}

{% endfor %}