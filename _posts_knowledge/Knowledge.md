---
layout: post
title: Knowledge
---

# Algorithm & Datastruct

* [Algorithm]({{ site.githubbloburl }}/_includes/_shared_block/Concept/Algorithm.md)

* [Datastruct]({{ site.githubbloburl }}/_includes/_shared_block/Concept/DataStruct.md)

{% assign datas = site.data.AlgorithmAndDataStruct %}

{% for data in datas %}

<!-- 목차 생성 -->
{% if data.Type == "Title" %}
{{ data.Header }}# {{ data.Name }}
{% endif %}

<!-- 내용 추가 -->
{% if data.Type == "Content" %}
* [{{data.Name}}]({{data.Path}})
{% endif %}

{% endfor %}

# Knowledge

{% assign datas = site.data.Knowledge %}

{% for data in datas %}

<!-- 목차 생성 -->
{% if data.Type == "Title" %}
{{ data.Header }}# {{ data.Name }}
{% endif %}

<!-- 내용 추가 -->
{% if data.Type == "Content" %}
* [{{data.Name}}]({{data.Path}})
{% endif %}

{% endfor %}

# Experience

{% assign datas = site.data.Experience %}

{% for data in datas %}

<!-- 목차 생성 -->
{% if data.Type == "Title" %}
{{ data.Header }}# {{ data.Name }}
{% endif %}

<!-- 내용 추가 -->
{% if data.Type == "Content" %}
* [{{data.Name}}]({{data.Path}})
{% endif %}

{% endfor %}
