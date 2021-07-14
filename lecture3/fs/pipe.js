const fs = require('fs');
const zlib = require('zlib');

const readStream = fs.createReadStream("readme.txt", { highWaterMark: 16 });
const writeStream = fs.createWriteStream("writeme.txt");
readStream.pipe(writeStream);  // 파이핑: 16바이트씩 읽은 것을 16바이트씩 쓰기

const zlibStream = zlib.createGzip();
readStream.pipe(zlibStream).pipe(writeStream);  // 16바이트 씩 읽고 압축해서 16바이트씩 쓰기
