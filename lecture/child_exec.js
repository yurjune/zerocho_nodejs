const { exec } = require("child_process");

const process = exec("dir");  // exec: 터미널 띄우기, 명령어 dir

process.stdout.on("data", (data) => {
  console.log(data.toString('utf-8'));
});

process.stderr.on("data", (data) => {
  console.err(data.toString('utf-8'));
});
