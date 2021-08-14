const jwt = require('jsonwebtoken');
const RateLimit = require('express-rate-limit');

exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(403).send('로그인 필요');
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    const message = encodeURIComponent('로그인한 상태입니다.');
    res.redirect(`/?error=${message}`);
  }
};

/* jwt 작동원리
1) 클라이언트에서 HTTP Request 요청을 보냄
2) 서버는 유효성을 확인하고 Token을 발급하여 Response로 보냄
3) 클라이언트는 해당 Token 값을 HTTP Request header / URI로 보내서 인증
*/
exports.verifyToken = (req, res, next) => {
  try {
    // returns the payload decoded
    req.decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
    return next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(419).json({
        code: 419,
        message: '토큰이 만료되었습니다',
      });
    }
    return res.status(401).json({
      code: 401,
      message: '유효하지 않은 토큰입니다',
    });
  }
};

exports.apiLimiter = new RateLimit({
  windowMs: 60*1000, // 1분
  max: 10,
  handler(req, res) { // 제한을 어겼을 경우
    res.status(this.statusCode).json({  // 기본 429
      code: this.statusCode,
      message: '1분에 열 번만 요청할 수 있습니다.'
    })
  }
});

exports.deprecated = (req, res) => {
  res.status(410).json({
    code: 410,
    message: '새로운 버전이 나왔습니다. 새로운 버전을 사용하세요',
  });
}
