const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../models/user');

module.exports = () => {
  passport.use(new LocalStrategy({
    usernameField: 'email', // 프론트에서 req.body.email로 요청을 보내줘야 함
    passwordField: 'password',  // req.body.password
  }, async (email, password, done) => {
    // 위 콜백이 아마 verify callback
    try {
      const exUser = await User.findOne({ where: { email } });
      if (exUser) {
        const result = await bcrypt.compare(password, exUser.password);
        if (result) {
          // the verify callback invokes done
          done(null, exUser);
        } else {
          // 인수1: 서버에러, 인수2: 성공한 경우, 인수3: 클라이언트 에러
          done(null, false, { message: '비밀번호가 일치하지 않습니다.' });
        }
      } else {
        done(null, false, { message: '가입되지 않은 회원입니다.' });
      }
    } catch (error) {
      console.error(error);
      done(error);
    }
  }));
};
