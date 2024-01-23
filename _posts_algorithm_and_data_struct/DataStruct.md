---
layout: post
title: Data struct
---

## 자료구조

![자료구조](https://velog.velcdn.com/images%2Fmar_f%2Fpost%2F5a1591f9-b2a6-4ee9-a710-f18ef102a891%2Fimage-20210117185326497.png)

## 자료구조 맵(Map)

맵(map)은 특정 순서에 따라 키와 매핑된 값의 조합으로 형성된 자료 구조입니다.

* 레드 블랙 트리 자료 구조를 기반으로 형성되고, 삽입하면 자동으로 정렬됩니다.

<details><summary>Map 자료구조는 왜 이용하는가?</summary>
<div markdown="1">

List형태의 자료구조들은 순서대로 값을 차곡차곡 집어넣는 일련의 하나의 줄과 같은 형태입니다. 반면 Map 형태의 자료구조는 각각의 Key와 매칭 되는 Value들이 존재합니다. 즉 순서보다는 정의된 이름(Key)와 상응하는 데이터들을 묶기 위한 자료 구조로서 효과적입니다.

</div></details>

<details><summary>Map 자료구조의 대표적인 종류</summary>
<div markdown="1">

Map의 개념을 이용하여 사용하는 대표적인 자료구조는 크게 3가지 정도 있습니다.

* HashMap
    * Key와 Value의 쌍으로만 구성이 될 뿐 자료구조 안에 묶인 쌍들에 대한 순서는 보장할 수 없습니다.
    * 즉, 사용자는 키와 값이 구성되는 위치를 결정 하거나 알 수 없습니다.
* TreeMap
    * Key의 값을 이용해 순서대로 정렬하여 데이터를 저장하는 자료구조입니다.
    * Key값을 통한 탐색 뿐 아니라 Key값의 정렬을 통한 탐색 등을 하기에 용의합니다.
* LinkedHashMap
    * 데이터를 입력한 순서대로 쌓아지며 데이터를 저장하는 자료구조입니다.
    * 배열, 리스트처럼 인덱싱 접근을 하기에 용의합니다.

</div></details>
