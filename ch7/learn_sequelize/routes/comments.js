const express = require('express');
const { Comment, User } = require('../models');

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    const comment = await Comment.create({
      commenter: req.body.id,
      comment: req.body.comment,
    });
    console.log(comment);
    res.status(201).json(comment);

    // // 주인없는 댓글을 달고 댓글과 주인을 연결해주는 방식도 가능
    // const user = await User.findOne({ where: { id: req.body.id }})
    // const comment = await Comment.create({
    //   comment: req.body.comment,
    // })
    // const userComment = await user.addComment(comment);  // 댓글과 작성자를 연결;
    // res.status(201).json(userComment);
    // /*
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.route('/:id')
  .patch(async (req, res, next) => {
    try {
      const result = await Comment.update({
        comment: req.body.comment,
      }, {
        where: { id: req.params.id },
      });
      res.json(result);
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const result = await Comment.destroy({ where: { id: req.params.id } });
      res.json(result);
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

module.exports = router;
