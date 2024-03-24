# 목차 생성 자동화를 위한 GithubAction

SharedBlock에 있는 내용을 Post로 옮기는 과정에서 파일의 경로를 가져오는데 번거롭고 어려움을 느꼈습니다. 특히 문서가 업데이트 될 때마다 경로를 직접 수정해야 하는 부분에서 일일이 찾아 수정하는 것이 힘들었습니다. 따라서 Github Action을 이용해 이 과정을 단순하게 했습니다. 

SharedBlock 아래에 있는 분류에 따라 디렉토리를 만들며 각 파일은 파일명에 해당하는 범위에 대한 설명이 내용으로 들어가있습니다. 이를 분류하거나 어떤 내용들을 담고 있는지 보기 위해 파일의 디렉토리 명들을 모아 json형태의 파일로 또한 파일을 블로그 포스트에 쉽게 첩부하기 위해 Url과 태그에 대한 정보를 json형태의 파일로 만듭니다. 그리고 이를 이용하여 분류를 제목으로 하여 해당 목차로 바로 이동할 수 있습니다.

![image](https://github.com/kbmhansungb/kbmhansungb.github.io/assets/56149613/5e7a79d7-2c52-48a7-883c-0620ff965b49)

## 사용방법
1. Github Repository에서 SharedBlock 폴더 아래에 문서를 작성하여 추가합니다.
2. Github Action이 Data를 업데이트 할 때까지 기다립니다.
3. 변경된 내용을 적용합니다.

## 설명
만들고자 하는 json파일은 다음과 같은 형태를 가집니다:

```json
[
  {
    "Type": "Content",
    "Name": "AlgorithmAndDataStruct",
    "Path": "https://github.com/kbmhansungb/kbmhansungb.github.io/blob/master/_includes/_shared_block/AlgorithmAndDataStruct/AlgorithmAndDataStruct.md"
  },
  {
    "Type": "Title",
    "Header": "#",
    "Name": "DataStruct"
  },
  {
    "Type": "Content",
    "Name": "AVLTree",
    "Path": "https://github.com/kbmhansungb/kbmhansungb.github.io/blob/master/_includes/_shared_block/AlgorithmAndDataStruct/DataStruct/AVLTree.md"
  },
```

원하는 json 형태를 생성하는 action과 이를 보여주는 post는 다음과 같이 작성합니다:
```liquid
---
layout: post
title: Algorithm and data struct
---

{% raw %}{% assign datas = site.data.AlgorithmAndDataStruct %}

{% for data in datas %}

  <!-- 목차 생성 -->
{{ data.Content }} {{ data.Name }}

  <!-- 내용 추가 -->
{% if data.Path %}
{% include {{data.Path}} %}
{% endif %}

{% endfor %}{% endraw %}
``` 

```js
const fs = require('fs');

const folderPath = '_includes/_shared_block/AlgorithmAndDataStruct'; // 업데이트하려는 폴더의 경로
const outputPath = '_data/AlgorithmAndDataStruct.json'; // 결과를 저장할 Markdown 파일 경로

// 결과를 저장할 배열
dataList = []; // 결과를 저장할 배열

/**
 * 디렉토리를 순환하며 dataList를 만듭니다.
 * 폴더일 경우 Title을 만들고, 파일일 경우 Content를 만듭니다.
 */
function circuitDirectory(dirDepth, curruntPath) {
    fs.readdirSync(curruntPath).forEach((name) => {
        const filePath = `${curruntPath}/${name}`;
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            makeTitleData(dirDepth + 1, name, filePath);

            circuitDirectory(dirDepth + 1, filePath);
        } else {
            makeContentData(dirDepth + 1, name, filePath);
        }
    });
}

/**
 * 타이틀 데이터를 만듭니다.
 * 
 * depth만큼 #을 header로 추가합니다. 예를 들어 depth가 2이면 ##을 추가합니다.
 */
function makeTitleData(depth, name, Path)
{
    header = "";
    for (let i = 0; i < depth; i++) {
        header += "#";
    }

    dataList.push({
        Type: "Title",
        Header: header,
        Name: name,
    });
}

/** 
 * 컨텐츠 데이터를 만듭니다.
 */
function makeContentData(depth, name, path)
{
    githubPath = "https://github.com/kbmhansungb/kbmhansungb.github.io/blob/master/" + path;
    
    // name에서 .md를 제거합니다.
    name = name.replace(".md", "");
    
    dataList.push({
        Type: "Content",
        Name: name,
        Path: githubPath,
    });
}

/**
 * 폴더 목록을 업데이트하고 결과를 출력하는 함수
 */
try {
    console.log('updateSharedBlockBlock: Start \n');

    circuitDirectory(0, folderPath);
    const json = JSON.stringify(dataList, null, 2);
    fs.writeFileSync(outputPath, json);

    console.log('updateSharedBlockBlock: End \n');
} catch (err) {
    console.error(err);
    process.exit(1);
}
```

# 결론
SharedBlock에 문서를 추가하면 json 형태의 데이터에 추가되고 목차가 업데이트 됩니다. 이는 새로운 문서를 작성할 때 마다 해야하는 바복잡업을 줄여 문서를 작성하는데 더욱 집중할 수 있게 합니다.

## 참고
* [Jekyll Docs](https://jekyllrb.com/docs/)
* [Github Docs, "Github Actions"](https://docs.github.com/en/actions)
