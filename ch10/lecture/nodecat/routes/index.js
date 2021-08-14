const express = require('express');
const axios = require('axios');
const router = express.Router();
const URL = 'http://localhost:8002/v2';

// nodebird API가 요청이 어디서 왔는지 headers의 origin을 보고 판단가능
axios.defaults.headers.origin = 'http://localhost:4000';

// nodebird API서버로 요청을 보내는 함수
const request = async (req, api) => {
  try {
    if (!req.session.jwt) { // 세션에 토큰이 없으면 토큰 발급 시도
      const tokenResult = await axios.post(`${URL}/token`, {
        clientSecret: process.env.CLIENT_SECRET,
      });
      // 토큰 발급 성공
      req.session.jwt = tokenResult.data.token; // 세션에 토큰 저장
    }
    return await axios.get(`${URL}${api}`, {
      headers: { authorization: req.session.jwt }
      // 이후 req.headers.authorization으로 접근
    });
  } catch (error) {
    if (error.response.status === 419) { // 토큰 만료 시
      delete req.session.jwt; // delete연산자: 객체의 속성을 제거
      return request(req, api); // 재귀
    }
    // error.response가 undefined이다 나중에 해결
    return error.response;
  }
}

router.get('/mypost', async (req, res, next) => {
  try {
    const result = await request(req, '/posts/my')
    res.json(result.data);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get('/search/:hashtag', async (req, res, next) => {
  try {
    const result = await request(
      req, `/posts/hashtag/${encodeURIComponent(req.params.hashtag)}`
    );
    res.json(result.data);
  } catch (error) {
    if (error.code) {
      console.error(error);
      next(error);
    }
  }
});

module.exports = router;
