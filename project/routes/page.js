const express = require('express');
const { User, Post, Hashtag } = require('../models');
const router = express.Router();

router.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.followerCount = req.user? req.user.Followers.length : 0;
  res.locals.followingCount = req.user? req.user.Followings.length : 0;
  res.locals.followingIdList = req.user? req.user.Followings.map(f => f.id) : [];
  next();
});

router.get('/profile', (req, res) => {
  res.render('profile', { title: '내 정보'});
});

router.get('/join', (req, res) => {
  res.render('join', { title: '회원가입' });
});

router.get('/', async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      include: {
        model: User,
        attributes: ['id', 'nick'],
      },
      order: [['createdAt', 'DESC']]
    });
    res.render('main', {
      title: 'Project',
      twits: posts,
    });
  } catch (err) {
    console.error(err);
    next(err);  // 에러처리 미들웨어로
  }
})

// 해시태그 검색시
router.get('/hashtag', async (req, res, next) => {
  const query = req.query.hashtag;
  console.log(query);
  if (!query) {
    return res.redirect('/');
  }
  try {
    const hashtag = await Hashtag.findOne({ where: { title: query }});
    let posts;
    if (hashtag) {
      posts = await hashtag.getPosts({
        include: [{
          model: User,
          attributes: ['id', 'nick'],
        }],
      });
    }
    return res.render('main', {
      title: `${query} | Project`,
      twits: posts
    })
  } catch (err) {
    console.error(err);
    return next(err);
  }
});

module.exports = router;
