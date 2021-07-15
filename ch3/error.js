// 1 try catch로 감싸기
setInterval(() => {
  console.log('시작');
  try {
    throw new Error("서버를 고장내주마!");
  } catch (err) {
    console.error(err);
  }
}, 1000);

// 2 노드가 제공하는 비동기 함수들의 콜백 에러는 프로그램을 멈추지 않는다
const fs = require("fs");

setInterval(() => {
  fs.unlink('./abcd.js', (err) => {
    console.error(err);
  })
}, 1000);
