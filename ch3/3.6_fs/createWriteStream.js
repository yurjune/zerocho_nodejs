const fs = require("fs");

// 파일을 스트림으로 쓰기
const writeStream = fs.createWriteStream('./writeme.txt');

writeStream.on('finish', () => {
  console.log("파일 쓰기 완료");
})

writeStream.write("이 글을 씁니다.\n");  // 첫 번째 버퍼
writeStream.write("한 번 더 씁니다.\n"); // 두 번째 버퍼
writeStream.end();
