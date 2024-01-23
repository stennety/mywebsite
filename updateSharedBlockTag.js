const fs = require('fs');
const path = require('path');

const folderPath = '_includes/_shared_block/'; // 업데이트하려는 폴더의 경로
const outputPath = '_includes/_generated/Tag.json'; // 결과를 저장할 Markdown 파일 경로

/**
 * 디렉토리들의 이름을 반환합니다.
 */
function circuiteReadDirectory(dir) {
    const files = fs.readdirSync(dir);
    const fileList = [];

    // 폴더 아래의 모든 파일을 탐색
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        // 디렉토리의 이름을 fileList에 추가합니다
        if (stat.isDirectory()) {
            fileList.push(file);

            // 디렉토리 아래의 파일들을 재귀적으로 탐색합니다.
            const subFiles = circuiteReadDirectory(filePath);
            fileList.push(...subFiles.map(subFile => subFile));
        }
    });
    return fileList;
}

/**
 * 폴더 목록을 태그 파일에 json형태로 저장합니다.
 */
try {
    //fileList를 json형태로 저장합니다.
    //json 데이터의 이름은 Tag
    const fileList = circuiteReadDirectory(folderPath);
    const json = JSON.stringify(fileList, null, 2);
    fs.writeFileSync(outputPath, json);

    console.log('Folder list updated successfully. \n' + fileList);
} catch (err) {
    console.error(err);
    process.exit(1);
}
