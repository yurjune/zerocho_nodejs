const express = require('express');
const { Post, User, Hashtag } = require('../models');

const router = express.Router();

router.use((req, res, next) => {
  // 자주 쓰이는 user변수를 위에서 선언: 다른 라우트에서 활용 가능
  // req.user는 deserializeUser에서 나온 것
  res.locals.user = req.user;
  res.locals.followerCount = req.user ? req.user.Followers.length : 0;
  res.locals.followingCount = req.user ? req.user.Followings.length : 0;
  // 내가 팔로잉중인 사람들의 리스트
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

// 해쉬태그 검색 라우터
// GET /hashtag?hashtag=노드
router.get('/hashtag', async (req, res, next) => {
  // 만약 한글 주소를 form에서 encodeURIcomponent를 했다면 decodeURIcomponent로 받아야한다
  // const query = decodeURIComponent(req.query.hashtag);
  const query = req.query.hashtag;
  if (!query) {
    return res.redirect('/');
  }
  try {
    const hashtag = await Hashtag.findOne({ where: { title: query } });
    let posts = [];
    if (hashtag) {
      // 노드라는 해시태그에 딸려있는 posts를 가져와라
      // include를 하면 게시글의 작성자까지 가져온다
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
