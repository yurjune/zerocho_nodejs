const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();

// 회원가입 라우터
router.post('/join', isNotLoggedIn, async (req, res, next) => {
  const { email, nick, password } = req.body;
  try {
    // email에 왜 중괄호??
    const exUser = await User.findOne({ where: { email } });
    if (exUser) { // 기존에 가입한 이메일인지 확인
      return res.redirect('/join?error=exist');
    }
    const hash = await bcrypt.hash(password, 12);
    await User.create({
      email,
      nick,
      password: hash,
    });
    return res.redirect('/');
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

router.post('/login', isNotLoggedIn, (req, res, next) => {
  /*
  localStrategy.js('local')에서 done함수를 만난 후 커스텀 콜백이 실행
  커스텀 콜백의 인수는 'local'의 done함수의 인수와 매칭
  커스텀 콜백 내부의 req.login()을 실행시켜 serializeUser()로 user전달
  커스텀 콜백 미사용시 자동으로 req.login() 을 실행
  */
  passport.authenticate('local', (authError, user, info) => {
    if (authError) {  // 서버 에러가 난 경우
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      return res.redirect(`/?loginError=${info.message}`);  // 프론트로 돌려보내줌
    }
    // 사용자 객체(user)을 받으면 index.js로 가서 serializeUser 실행
    // done 만난 후 콜백 실행
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      // 이 때 세션 쿠키를 브라우저로 보내줘요
      return res.redirect('/');
    });
  })(req, res, next); // 미들웨어 안의 미들웨어
  // authenticate()는 middleware function object를 리턴하므로,
  // (req, res, next)를 끝에 붙여서 evoke 해주어 요청 응답 주기 유지
});

router.get('/logout', isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

// 카카오 로그인 페이지로 이동 후 로그인
// 카카오가 callbackURL로 토큰, 사용자 정보를 보내준다
router.get('/kakao', passport.authenticate('kakao'));

// 로그인을 처리하는 부분
router.get('/kakao/callback', passport.authenticate('kakao', {
  failureRedirect: '/',
}), (req, res) => { // done 호출 이후 실행
  res.redirect('/');
});

module.exports = router;
