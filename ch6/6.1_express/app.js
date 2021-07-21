const express = require('express');
const path = require('path');

const app = express();
app.set('port', process.env.PORT || 3000);

app.use((req, res, next) => {
  console.log('모든 요청에 실행');
  next();
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.get('/category/:name', (req, res) => {  // 라우트 매개변수
  res.send(`hello ${req.params.name}`);
});

app.use((req, res, next) => {  // 에러 커스터마이징
  res.send('404처리 미들웨어');
});

app.use((err, req, res, next) => {  // 에러 미들웨어
  console.error(err.name);
  res.send('에러났음, 근데 안알려줄거임');
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});


/*
라우팅: 클라이언트의 요청에 응답하는 방법을 결정하는 것

미들웨어: 요청객체, 응답객체, 그리고 어플리케이션 요청-응답 사이클 도중 그 다음의 미들웨어 함수에 대한 엑세스 권한을 갖는 함수
= 익스프레스 내에서 웹 요청과 응답에 대한 정보를 사용해서 필요한 처리를 진행할 수 있도록 분리된 독립적인 함수

'*': 애스터리스크
*/