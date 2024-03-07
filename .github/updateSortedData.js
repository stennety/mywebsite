const fs = require('fs');

const folderPath = '_includes/_shared_block/'; // 업데이트하려는 폴더의 경로
const outputPath = '_data/'; // 결과를 저장할 Markdown 파일 경로

/**
 * 디렉토리를 순환하며 데이터를 만듭니다.
 */
function traverseDirectory(dataList, dirDepth, currentPath) {
    fs.readdirSync(currentPath).forEach((name) => {
        const filePath = `${currentPath}/${name}`;
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            makeTitleData(dataList, dirDepth + 1, name);
            traverseDirectory(dataList, dirDepth + 1, filePath);
        } else {
            makeContentData(dataList, dirDepth + 1, name, filePath);
        }
    });
}

/**
 * 타이틀 데이터를 만듭니다.
 */
function makeTitleData(dataList, depth, name) {
    let header = "#".repeat(depth);
    dataList.push({
        Type: "Title",
        Header: header,
        Name: name,
    });
}

/** 
 * 컨텐츠 데이터를 만듭니다.
 */
function makeContentData(dataList, depth, name, path) {
    const githubPath = "https://github.com/kbmhansungb/kbmhansungb.github.io/blob/master/" + path.replace(/^\.\//, '');
    name = name.replace(".md", "");
    dataList.push({
        Type: "Content",
        Name: name,
        Path: githubPath,
    });
}

/**
 * 디렉토리의 데이터를 정렬하여 JSON 파일로 저장합니다.
 */
function createJSONFromDirectory(folders, outputFileName) {
    let dataList = [];

    folders.forEach(folder => {
        const path = folderPath + folder;
        traverseDirectory(dataList, 0, path);
    });

    const json = JSON.stringify(dataList, null, 2);
    fs.writeFileSync(`${outputPath}${outputFileName}.json`, json);
}

try {
    console.log('updateSharedBlockBlock: Start \n');
    createJSONFromDirectory(["AlgorithmAndDataStruct"], "AlgorithmAndDataStruct");
    createJSONFromDirectory(["Math", "Graphic"], "Knowledge");
    createJSONFromDirectory(["Collection", "Concept", "Programming", "DevelopmentEnvironment", "Tool"], "Experience");
    console.log('updateSharedBlockBlock: End \n');
} catch (err) {
    console.error(err);
    process.exit(1);
}
