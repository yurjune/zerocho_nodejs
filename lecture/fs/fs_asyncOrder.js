// 비동기작업의 순서 맞추기
const fs = require("fs").promises;

// // 프로미스 체인
// fs.readFile("./readme.txt")
//   .then((result) => {
//     console.log("1번", result)
//     return fs.readFile("./readme.txt")
//   })
//   .then((result) => {
//     console.log("2번", result)
//     return fs.readFile("./readme.txt")
//   })
//   .then((result) => {
//     console.log("3번", result)
//     return fs.readFile("./readme.txt")
//   })
//   .then((result) => {
//     console.log("4번", result)
//     return fs.readFile("./readme.txt")
//   })
//   .catch((err) => {
//     throw err;
//   })


// async await
async function main() {
  let result = await fs.readFile("./readme.txt");
  console.log("1번", result.toString());
  result = await fs.readFile("./readme.txt");
  console.log("2번", result.toString());
  result = await fs.readFile("./readme.txt");
  console.log("3번", result.toString());
  result = await fs.readFile("./readme.txt");
  console.log("4번", result.toString());
}
main();