const router = require("express").Router();
const { User, Comment, Post } = require("../../models");
router.post("/", (req, res) => {
  User.create({
    username: req.body.username,
    password: req.body.password,
  })
    .then((dbUserData) => {
      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;
        res.json(dbUserData);
      });
    })
    .catch((err) => {
      console.log(err);
    });
});
router.post("/login", (req, res) => {
  console.log(req.body.username);
  User.findOne({ where: { username: req.body.username } }).then((userdate) => {
    if (!userdate) {
      res.json({ message: "user not found" });
    }
    //for some reason the if statement throws an error if its not set up like this
    const passwordtrue = userdate.checkPassword(req.body.password) || false;
    if (!passwordtrue) {
      res.status(400).json({ message: "incorrect password" });
      return;
    }
    req.session.save(() => {
      req.session.user_id = userdate.id;
      req.session.username = userdate.username;
      req.session.loggedIn = true;
      res.json({ user: userdate, message: "login success" });
    });
  });
});
router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});
router.get("/:id", (req, res) => {
  User.findOne({
    where: { id: req.params.id },
    include: [{ model: Post }, { model: Comment }],
  })
    .then((data) => res.json(data))
    .catch((err) => console.log(err));
});
router.post("/signup", (req, res) => {});
module.exports = router;
