const express = require('express');
const User = require('../schemas/user');
const Comment = require('../schemas/comment');

const router = express.Router();

router.route('/')
  .get(async (req, res, next) => {
    try {
      // mongoose에서 find는 전체를 찾는다, 단일은 findOne
      const users = await User.find({});
      res.json(users);
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .post(async (req, res, next) => {
    try {
      // db에 저장할때: 방법1
      const user = await User.create({
        name: req.body.name,
        age: req.body.age,
        married: req.body.married,
      });

      // // 방법 2
      // const user = new User({
      //   name: req.body.name,
      //   age: req.body.age,
      //   married: req.body.married,
      // });
      // await user.save();

      console.log(user);
      res.status(201).json(user);
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

router.get('/:id/comments', async (req, res, next) => {
  try {
    // populate 방법2: 먼저 찾은 다음에 populate
    // 속도를 위해서 find할때 index를 걸어준다
    const comments = await Comment.find({ commenter: req.params.id })
      .populate('commenter');
    console.log(comments);
    res.json(comments);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
