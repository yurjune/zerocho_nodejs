const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const nunjucks = require('nunjucks');
const dotenv = require('dotenv');
const morgan = require('morgan');
const path = require('path');
const { sequelize } = require('./models');  // db.sequelize
const passport = require('passport');
const passportIndex = require('./passport');

const pageRouter = require('./routes/page');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const postRouter = require('./routes/post');

const app = express();
dotenv.config();

app.set('port', process.env.PORT || 8002);

app.set('view engine', 'html');
nunjucks.configure('views', {
  express: app,
  watch: true,
});

// synchronize model and table
sequelize.sync({
  force: false,
})
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch((err) => {
    console.error(err);
  })

passportIndex();

// 미들웨어
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/img', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
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

app.use(passport.initialize());
app.use(passport.session());

// 라우터 연결
app.use('/', pageRouter);
app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/post', postRouter);


// 404 미들웨어
app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다`);
  error.status = 404;
  next(error);  // 에러처리 미들웨어로 보내기
})

// 에러처리 미들웨어
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production'? err : {};
  res.status(err.status || 500);
  res.render('error');
})

app.listen(app.get('port'), () => {
  console.log(`${app.get('port')} 번 포트에서 응답중입니다`);
})
