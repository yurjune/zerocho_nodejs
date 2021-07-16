const fs = require("fs");

// 파일을 스트림으로 읽기
// 버퍼가 파일사이즈와 같은 방식으로 읽으려면 readFile
// 조각조각 나눠서 읽으려면 스트림
const readStream = fs.createReadStream('./readme.txt', { highWaterMark: 32 });  // 버퍼의 최대크기 32?

let data = [];
readStream.on('data', (chunk) => {
  data.push(chunk);
  console.log('data:', chunk, chunk.length);
});
readStream.on('end', () => {
  console.log('end:', Buffer.concat(data).toString())
});
readStream.on('error', (err) => {
  console.log('error:', error)
});
