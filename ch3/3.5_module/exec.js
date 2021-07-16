const { exec } = require("child_process");

const process = exec("dir");  // exec: 터미널 띄워서 명령어 입력

// 결과물을 직접 받아와서 콘솔에 띄우기
process.stdout.on("data", (data) => {
  console.log(data.toString('utf-8'));
});
process.stderr.on("data", (data) => {
  console.err(data.toString('utf-8'));
});
