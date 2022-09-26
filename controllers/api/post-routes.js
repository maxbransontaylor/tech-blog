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
router.get("/:id", (req, res) => {
  Post.findOne({
    where: { id: req.params.id },
    include: [{ model: User }, { model: Comment }],
  })
    .then((post) => res.json(post))
    .catch((err) => console.log(err));
});
router.post("/", (req, res) => {
  Post.create({
    title: req.body.title,
    post_content: req.body.post_content,
    user_id: req.session.user_id,
  })
    .then((response) => res.json(response))
    .catch((err) => console.log(err));
});
router.put("/:id", (req, res) => {
  Post.update(
    { title: req.body.title, post_content: req.body.post_content },
    { where: { id: req.params.id } }
  )
    .then((data) => res.json(data))
    .catch((err) => {
      console.log(err);
    });
});
router.delete("/:id", (req, res) => {
  Post.destroy({ where: { id: req.params.id } })
    .then((response) => res.json(response))
    .catch((err) => console.log(err));
});
module.exports = router;
