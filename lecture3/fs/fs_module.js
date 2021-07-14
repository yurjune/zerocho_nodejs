// // 콜백
// const fs = require("fs");

// fs.readFile("./readme.txt", (err, data) => {
//   if (err) {
//     throw err;
//   }
//   console.log(data)
// })


// promise
const fs = require("fs").promises;

fs.writeFile("./writeme.txt", "글을 씁니다")
  .then(() => {
    return fs.readFile("writeme.txt");
  })
  .then((result) => {
    console.log(result.toString());
  })
  .catch((err) => {
    throw err;
  })
