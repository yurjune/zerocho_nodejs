const express = require('express');
const session = require('express-session');
const morgan = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');
const nunjucks = require('nunjucks');
const dotenv = require('dotenv');
const passport = require('passport');

dotenv.config();
const pageRouter = require('./routes/page');
const authRouter = require('./routes/auth');
const postRouter = require('./routes/post');
const userRouter = require('./routes/user');

const { sequelize } = require('./models');  // db.sequelize
const passportConfig = require('./passport'); // index.js의 모듈을 불러옴

const app = express();
app.set('port', process.env.PORT || 8001);
app.set('view engine', 'html');
nunjucks.configure('views', {
  express: app,
  watch: true,
});
/*
테이블이 수정되었을 때:
force: true: 테이블을 drop 후 다시 생성(데이터 날아감): 실무에서 불가능
alter: true: 데이터를 유지하고 수정사항 반영
alter는 컬럼과 기존데이터들의 불일치로 에러가 나는 경우가 종종 있다
예를 들면 allowNull: false인 컬럼을 추가했을 때 기존 데이터는 그 컬럼이 없어서 에러가 난다
*/
sequelize.sync({ force: false })
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch((err) => {
    console.error(err);
  });
passportConfig();

// middleware
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/img', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());  // 바디파서
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
}));

// 라우터로 가기전에 passport 미들웨어 연결
// 세션을 받아야 해서 express session보다는 아래에 위치
app.use(passport.initialize());
app.use(passport.session());

app.use('/', pageRouter);
app.use('/auth', authRouter);
app.use('/post', postRouter);
app.use('/user', userRouter);

// 404 처리 미들웨어
app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다`);
  error.status = 404;
  next(error);
});

// 에러 미들웨어
app.use((err, req, res, next) => {
  res.locals.message = err.message; // 템플릿 엔진에서 message라는 변수 쓸 수 있게 설정
  // 배포모드에서는 에러의 스택(상세내역) 볼 수 없게 설정
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500).render('error');  // 체이닝
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기중');
});
