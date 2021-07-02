const fs = require('fs').promises

fs.readdir('./folder')  // 폴더 내용물 확인
  .then((dir) => {
    console.log("폴더 내용물 확인");
    return fs.unlink('./folder/newfile.js') // 파일 삭제
  })
  .then(() => {
    console.log("파일 삭제 완료")
    return fs.rmdir('./folder') // 폴더 삭제
  })
  .then(() => {
    console.log("폴더 삭제 완료")
  })
  .catch(err => console.log(err));
  