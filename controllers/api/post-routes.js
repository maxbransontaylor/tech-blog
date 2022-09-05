const router = require("express").Router();
const { Post, Comment, User } = require("../../models/index");

const sequelize = require("../../config/connection");
router.get("/", (req, res) => {
  Post.findAll({
    include: [{ model: User }, { model: Comment }],
  })
    .then((postdata) => {
      res.json(postdata);
    })
    .catch((err) => console.log(err));
});
module.exports = router;
