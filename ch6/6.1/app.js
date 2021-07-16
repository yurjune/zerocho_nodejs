const express = require('express');
const path = require('path');
const app = express();

app.set('port', process.env.PORT || 3000);  // 서버에 속성'port'를 심기

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'));  // 알아서 fs모듈을 사용해서 파일을 읽음
});

app.post('/', (req, res) => {
  res.send('hello express');
});

app.get('/', (req, res) => {
  res.send('hello express');
});

app.listen(app.get('port'), () => {
  console.log('express 서버 실행');
});

