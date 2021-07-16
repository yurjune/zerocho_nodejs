const fs = require('fs');
const fname = "none.txt";

// 콜백 에러 우선 처리
fs.readFile(fname, function(err, data){
  if (err) {
    return console.error(`error reading file ${fname} : ${err.message}`);
  }
  console.log(data);
});
