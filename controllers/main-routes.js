const router = require("express").Router();
const { User, Post, Comment } = require("../models");
const withAuth = require("../utils/auth");
router.get("/", (req, res) => {
  Post.findAll({ include: [{ model: User }, { model: Comment }] }).then(
    (data) => {
      const posts = data.map((post) => {
        return post.get({ plain: true });
      });
      console.log(req.session.loggedIn);
      console.log(req.session.loggedIn);
      res.render("home", { posts, loggedIn: req.session.loggedIn });
    }
  );
});
router.get("/post/:id", (req, res) => {
  Post.findOne({
    where: { id: req.params.id },
    include: [
      { model: User },
      { model: Comment, include: [{ model: User, attributes: ["username"] }] },
    ],
  }).then((post) => {
    const plainPost = post.get({ plain: true });
    console.log(plainPost);
    res.render("single", { plainPost });
  });
});
router.get("/login", (req, res) => {
  res.render("login");
});
router.get("/dashboard", withAuth, (req, res) => {
  Post.findAll({ where: { user_id: req.session.user_id } }).then((data) => {
    const posts = data.map((post) => {
      return post.get({ plain: true });
    });
    console.log(req.session.loggedIn);
    res.render("home", { posts, loggedIn: req.session.loggedIn });
  });
});
module.exports = router;
