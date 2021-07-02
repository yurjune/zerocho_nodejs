const { spawn } = require("child_process");

// spawn은 새로운 프로세스를 띄움
const process = spawn('python', ["test.py"]);

process.stdout.on("data", (data) => {
  console.log(data.toString());
});

process.stderr.on("data", (data) => {
  console.err(data.toString());
});
