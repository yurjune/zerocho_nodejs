const fs = require('fs').promises;
const constants = require('fs').constants;

fs.access('./folder', constants.F_OK | constants.W_OK | constants.R_OK)  // exists | readable | writeable
  .then(() => {
    return Promise.reject('이미 폴더 있음');
  })
  .catch(err => {
    if (err.code === 'ENOENT') {
      console.log("폴더가 없습니다");
      return fs.mkdir('./folder'); // 없으면 폴더만들기
    }
    return Promise.reject(err);
  })
  .then(() => {
    console.log("폴더 만들기 성공");
    return fs.open('./folder/file.js', 'w'); // 빈 파일 만들기
  })
  .then(() => {
    console.log('빈 파일 만들기 성공');
    fs.rename("./folder/file.js", "./folder/newfile.js")  // 이름 바꾸기
  })
  .then(() => {
    console.log("이름 바꾸기 성공")
  })
  