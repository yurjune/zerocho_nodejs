const passport = require('passport');
const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const User = require('../models/user');

module.exports = () => {
  passport.serializeUser((user, done) => {
    // req.login으로 부터 user를 받아
    // user.id가 session에 저장(serialized)됨
    // 후에 요청이 들어오면 deserial로 id로 유저 정보 얻는다
    // app.js에 passport.session()이 deserial을 실행하는듯
    done(null, user.id);
  });
  
  passport.deserializeUser((id, done) => {
    User.findOne({
      where: { id },
      include: [{
        model: User,
        attributes: ['id', 'nick'],
        as: 'Followers',
      }, {
        model: User,
        attributes: ['id', 'nick'],
        as: 'Followings',
      }]
    })
      .then(user => done(null, user))
      .catch(err => done(err))
  });
  local();
  kakao();
}