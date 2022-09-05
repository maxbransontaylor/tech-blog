const router = require("express").Router();
const { Post, User, Comment } = require("../../models");

router.post("/", (req, res) => {
  Comment.create({
    comment_text: req.body.comment_text,
    user_id: req.body.user_id,
    post_id: req.body.post_id,
  });
});
module.exports = router;
