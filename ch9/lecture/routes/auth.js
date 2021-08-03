const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const router = express.Router();

// 회원가입 라우터
router.post('/join', async (req, res, next) => {
  const { email, nick, password } = req.body;
  try {
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
    return res.redirect('/'); // 메인페이지로 돌려보내기
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

// 로그인
// 세션 문제, sns로그인 등 복잡한 로직을 위해 passport 라이브러리 사용
router.post('/login', () => {

});


router.get('/kakao', passport.authenticate('kakao'));

router.get('/kakao/callback', passport.authenticate('kakao', {
  failureRedirect: '/',
}), (req, res) => {
  res.redirect('/');
});

module.exports = router;
