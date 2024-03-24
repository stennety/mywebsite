# 목차 생성 자동화를 위한 GithubAction
> Data: 2024.02.27.

정리된 내용은 SharedBlock에 분류에 따라 폴더를 나누고 해당 내용을 마크다운 형태로 추가하고 있었습니다. 또한 포스트의 제목들은 우측에 바로가기 링크가 만들어지도록 이전에 만들어 뒀습니다. 이를 이용하여 분류를 제목으로 하여 해당 목차로 바로 이동할 수 있도록 합니다. 마크다운 파일을 내용으로 하고 클릭하면 해당 마크다운 파일로 이동하도록 링크를 추가합니다.

생성될 포스트의 내용을 json파일로 github action에서 만들고 이를 jekyll에서 읽어 포스트를 만들도록 합니다.

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
