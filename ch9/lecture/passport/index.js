/*
passport는 session 객체 내부에 passport 프로퍼티를 만들고, 값으로 쿠키와 식별자를 매칭해서 저장한다(serialize). 
이후 매 요청시에 세션에 저장된 식별자를 이용해 유저의 데이터를 찾아 
express 라우터 콜백함수의 req.user에 해당 데이터를 저장한다(deserialize).
*/

const passport = require('passport');
const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const User = require('../models/user');

module.exports = () => {
  passport.serializeUser((user, done) => {
    // done()의 결과로 세션 객체 생성, passport 프로퍼티가 생김
    // user.id: 세션은 가벼운 id만 들고 있고 나중에 deserializeUser로 유저 정보 복구
    done(null, user.id);
  });

  // 브라우저가 세션쿠키를 보내면(요청) app.js의 passport.session() 미들웨어가 id를 알아냄
  // deserializeUser로 id를 넘겨준다
  passport.deserializeUser((id, done) => {
    User.findOne({
      where: { id },
      include: [{
        model: User,
        attributes: ['id', 'nick'],
        as: 'Followers',  // 이 유저를 팔로잉하는 사람 가져오기?
      }, {
        model: User,
        attributes: ['id', 'nick'],
        as: 'Followings', // 이 유저가 팔로잉한 사람 가져오기
      }],
    })
      .then(user => done(null, user))
      // 복구한 user의 정보는 req.user로 접근가능
      // req.isAuthenticated = true
      .catch(err => done(err));
  });

  // 이 local() 코드는 실행을 해놓는 역할
  // localStrategy.js에서 module.exports는 했지만 실행은 안되어있다
  // 마찬가지로 index.js에서 module.exports한 함수 또한 app.js에서 실행해줘야 한다
  local();
  kakao();
};
