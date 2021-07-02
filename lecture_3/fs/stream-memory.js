const fs = require('fs');

// stream 메모리 체크
console.log('before:', process.memoryUsage().rss);

const readStream = fs.createReadStream("./big.txt");
const writeStream = fs.createWriteStream("./big3.txt");
readStream.pipe(writeStream);
readStream.on('end', () => {
  console.log('stream:', process.memoryUsage().rss);
})
