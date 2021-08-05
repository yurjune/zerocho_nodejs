const express = require('express');
const { Post, User } = require('../models');
const router = express.Router();

router.use((req, res, next) => {
  // 자주 쓰이는 user변수를 위에서 선언: 다른 라우트에서 활용 가능
  // req.user는 deserializeUser에서 나온 것
  res.locals.user = req.user;
  res.locals.followerCount = req.user ? req.user.Followers.length : 0;
  res.locals.followingCount = req.user ? req.user.Followings.length : 0;
  // 다음 코드는 내가 팔로잉중인 사람들의 리스트, followingIdList가 더 적합한 변수명
  res.locals.followerIdList = req.user ? req.user.Followings.map(f => f.id) : [];
  next();
});

router.get('/profile', (req, res) => {
  res.render('profile', { title: '내 정보 - NodeBird'});
});

router.get('/join', (req, res) => {
  res.render('join', { title: '회원가입 - NodeBird'});
});

router.get('/', async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      include: {
        model: User,  // 게시글 작성자
        attributes: ['id', 'nick'],
      },
      order: [['createdAt', 'DESC']],
    });
    res.render('main', {
      title: 'NodeBird',
      twits: posts,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
