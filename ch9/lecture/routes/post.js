const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { Post, Hashtag } = require('../models');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();

try {
  fs.readdirSync('uploads');
} catch (error) {
  console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
  fs.mkdirSync('uploads');
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'uploads/');
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

// 실제 파일은 upload 폴더에 들어있지만 요청주소는 /img이다
// express.static으로 주소 불일치 해결
// form에서 업로드하는 key와 .single()의 괄호 안 key가 같아야 한다.
router.post('/img', isLoggedIn, upload.single('img'), (req, res) => {
  console.log(req.file);
  // 이미지랑 게시글이랑 따로 업로드하는 방식을 사용 중
  // 따라서 이미지와 게시글이 어디 저장되어있는지 같이 묶어줘야 한다
  res.json({ url: `/img/${req.file.filename}` });
});


const upload2 = multer();
// 이미지는 이미 업로드됬고 게시글만 업로드하므로 .none() 사용
router.post('/', isLoggedIn, upload2.none(), async (req, res, next) => {
  try {
    const post = await Post.create({
      content: req.body.content,  // main.html의 textarea의 name="content"??
      img: req.body.url,  // 이미지와 게시글 엮기
      UserId: req.user.id,
    });
    const hashtags = req.body.content.match(/#[^\s#]*/g);
    // [#노드, #익스프레스]
    // [findOrCreate(노드), findOrCreate(익스프레스)]
    // result: [[Hashtag{}, true], [Hashtag{}, true]]
    // true이면 create된 것, false는 find
    if (hashtags) {
      const result = await Promise.all(
        hashtags.map(tag => {
          return Hashtag.findOrCreate({
            where: { title: tag.slice(1).toLowerCase() },
          })
        }),
        // cf) Hashtag.upsert: update or insert
      );
      // belongsToMany 이므로 복수형
      // result의 첫번 째 것만 꺼내서 addHashtags
      await post.addHashtags(result.map(r => r[0]));
    }
    res.redirect('/');
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
