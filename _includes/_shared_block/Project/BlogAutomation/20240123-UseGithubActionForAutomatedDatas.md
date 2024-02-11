<!-- GithubAction을 활용한 데이터 생성 자동화 -->

SharedBlock에 있는 내용을 Post로 옮기는 과정에서 파일의 경로를 가져오는데 번거롭고 어려움을 느꼈습니다. 특히 문서가 업데이트 될 때마다 경로를 직접 수정해야 하는 부분은 많은 시간을 많이 낭비하게 됩니다.

SharedBlock 아래에 있는 분류에 따라 디렉토리를 만들며 각 파일은 파일명에 해당하는 범위에 대한 설명이 내용으로 들어가있습니다. 이를 분류하거나 어떤 내용들을 담고 있는지 보기 위해 파일의 디렉토리 명들을 모아 json형태의 파일로 또한 파일을 블로그 포스트에 쉽게 첩부하기 위해 Url과 태그에 대한 정보를 json형태의 파일로 만들었습니다.

Tag.json
```json
[
  "Directory",
  "Directory",
  "Directory",
  ...
]
```

Block.json
```json
[
  "FileName": {
    "Url": "...github...",
    "Tag": [
      "Directory",
      ...
    ]
  },
  ...
]
```
