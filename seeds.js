const sequelize = require("./config/connection");
const { Post, User, Comment } = require("./models/index");

async function seed() {
  await sequelize.sync({ force: true });
  await User.bulkCreate([
    { username: "sampson", password: "password123" },
    { username: "tina", password: "password123" },
    { username: "olive", password: "password123" },
    { username: "jamantha", password: "password123" },
  ]);
  console.log("user seeded");
  await Post.bulkCreate(
    [
      {
        title: "very cool post",
        post_content: "i just think it is very cool",
        user_id: 1,
      },
      {
        title: "i just love posting",
        post_content: "it is my favorite past time",
        user_id: 2,
      },
      {
        title: "thank goodness for posting",
        post_content: "if i couldnt post i dont know what id do",
        user_id: 3,
      },
      {
        title: "POOOOOOSSSSSSSSTTTTTTTTTTT",
        post_content:
          "AHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH",
        user_id: 4,
      },
    ],
    { individualHooks: true }
  );
  console.log("post seeded");
  await Comment.bulkCreate([
    {
      comment_text: "test comment",
      user_id: 1,
      post_id: 2,
    },
    {
      comment_text: "test comment",
      user_id: 1,
      post_id: 3,
    },
    {
      comment_text: "test comment",
      user_id: 1,
      post_id: 4,
    },
    {
      comment_text: "test comment",
      user_id: 1,
      post_id: 1,
    },
    {
      comment_text: "test comment",
      user_id: 2,
      post_id: 1,
    },
    {
      comment_text: "test comment",
      user_id: 3,
      post_id: 1,
    },
    {
      comment_text: "test comment",
      user_id: 3,
      post_id: 1,
    },
    {
      comment_text: "test comment",
      user_id: 3,
      post_id: 1,
    },
  ]);
  console.log("comment seeded");
  process.exit(0);
}
seed();
