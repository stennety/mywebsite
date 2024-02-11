---
layout: post
title: 유니티 애셋 비동기 로드
---

## Task

{% include _shared_block/Programming/Language/CSharp/Task.md %}

## Unity build batch

1. 애셋의 로드하는 테스크들을 만든 후, 
2. 테스크들이 완료될때까지 기다립니다. 

``` c#
// 로드 할 테스크 목록
Task[] tasks = new Task[]
{
    LoadMaterialOrange(),
    LoadMaterialYellow(),
    UILoadAsset(EPlayType.Cleaner),
    ObjLoadAsset(EPlayType.Cleaner),
    TableLoadAsset("NarrationData", DataManager.Instance.OnLoadNarrationData),
    TableLoadAsset("CleanerPositionData", DataManager.Instance.OnLoadCleanerPositionData),
    NarrationLoadAsset(EPlayType.Cleaner),
    LoadSoundEffect(),
};

// 비동기 로드
await Task.WhenAll(tasks);
```