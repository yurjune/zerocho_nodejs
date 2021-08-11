const express = require('express');
const app = express();
app.set('port', process.env.PORT || 3000);

// form 태그의 enctype이 urlEncoded인 경우 body-parser로 해석가능
// enctype이 multipart/form-data 이면 해석불가
// multer자체가 미들웨어라기보다 multer함수 안에 4가지 미들웨어가 들어있다
const multer = require('multer');
const fs = require('fs');


try {
  // 서버 시작전에 실행되므로 sync사용가능
  fs.readdirSync('uploads');
} catch (error) {
  console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
  fs.mkdirSync('uploads');
}

const upload = multer({ // upload는 객체
  // storage와 limits 옵션
  storage: multer.diskStorage({ // 디스크에 저장
    destination(req, file, done) {
      done(null, 'uploads/');
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);  // 확장자 추출
      done(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },  // 5MB
});

app.get('/upload', (req, res) => {
  res.sendFile(path.join(__dirname, 'multipart.html'));
});

// multer의 single미들웨어
app.post('/upload', upload.single('image'), (req, res) => {
  console.log(req.file);  // upload한 정보는 req.file에 담긴다
  res.send('ok');
});

app.get('/', (req, res, next) => {
  console.log('GET / 요청에서만 실행됩니다.');
  next();
}, (req, res) => {
  throw new Error('에러는 에러 처리 미들웨어로 갑니다.')
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err.message);
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});