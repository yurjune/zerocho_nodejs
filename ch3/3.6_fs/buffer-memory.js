const fs = require('fs');

// buffer 메모리 체크
console.log('before:', process.memoryUsage().rss);

const data1 = fs.readFileSync("./big.txt");
fs.writeFileSync("./big2.txt", data1);

console.log('buffer:', process.memoryUsage().rss);
