const express = require('express');
const { Post, User, Hashtag } = require('../models');

const router = express.Router();

router.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.followerCount = req.user ? req.user.Followers.length : 0;
  res.locals.followingCount = req.user ? req.user.Followings.length : 0;
  res.locals.followingIdList = req.user ? req.user.Followings.map(f => f.id) : [];
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
    // // 테스트 코드
    // const writing = await Post.findOne({
    //   where: { id: 1 },
    //   include: { model: User, attributes: ['id', 'nick'] }
    // })
    // console.log('-------------')
    // console.log(writing.id) // post의 id
    // console.log(writing.UserId)   // 작성자의 id, foreignKey
    // console.log(writing.User.id)  // 작성자의 id, include 사용시
    const posts = await Post.findAll({
      include: {
        model: User,
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

// GET /hashtag?hashtag=노드
router.get('/hashtag', async (req, res, next) => {
  // 만약 한글 주소를 form에서 encodeURIcomponent를 했다면 decodeURIcomponent로 받아야한다
  // const query = decodeURIComponent(req.query.hashtag);
  const query = req.query.hashtag;
  console.log(query); // 노드
  if (!query) {
    return res.redirect('/');
  }
  try {
    const hashtag = await Hashtag.findOne({ where: { title: query } });
    let posts;
    if (hashtag) {
      posts = await hashtag.getPosts({ 
        include: [{
          model: User,
          attributes: ['id', 'nick'],
        }] 
      });
    }
    return res.render('main', {
      title: `${query} | NodeBird`,
      twits: posts,
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

module.exports = router;
