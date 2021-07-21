// dotenv: 환경변수나 비밀키 관리
const dotenv = require('dotenv');
dotenv.config();  // 이 코드는 process.env를 쓰는 패키지보다 위에 위치해야 한다

const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const indexRouter = require('./routes');
const userRouter = require('./routes/user');

app.set('port', process.env.PORT || 3000);


// 라우터 분리
app.use('/', indexRouter);
app.use('/user', userRouter);


// 써드파티 미들웨어
// 1 morgan
app.use(morgan('dev'));

// 2 static
// app.use('요청 경로', express.static('실제 경로'))
// 파일을 찾으면 next() 실행하지 않음
app.use('/', express.static(path.join(__dirname, 'public')));

// 3 body-parser
// for parsing application/json
// 클라이언트가 보낸 json데이터를 파싱해서 req.body에 넣음
app.use(express.json());

// for parsing application/x-www-form-urlencoded
// extended: true: qs모듈, false: queryString모듈
app.use(express.urlencoded({ extended: false }));

// 4 cookie-parser
// res.cookie로 set-cookie, req.cookies로 접근
app.use(cookieParser(process.env.COOKIE_SECRET));

// 5 session
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,  // 환경변수에 비밀 키를 숨겨놓음
  cookie: {
    httpOnly: true,
    secure: false,
  },
  name: 'session-cookie',
}));


app.use((req, res, next) => {
  res.status(404).send('Not Found');
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err.message);
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});
