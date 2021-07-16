// 비동기작업의 순서 맞추기
const fs = require("fs").promises;

fs.readFile("./readme.txt")
  .then((result) => {
    console.log("1번", result)
    return fs.readFile("./readme.txt")
  })
  .then((result) => {
    console.log("2번", result)
    return fs.readFile("./readme.txt")
  })
  .then((result) => {
    console.log("3번", result)
    return fs.readFile("./readme.txt")
  })
  .then((result) => {
    console.log("4번", result)
    return fs.readFile("./readme.txt")
  })
  .catch((err) => {
    throw err;
  })
