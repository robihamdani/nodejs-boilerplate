const express = require("express");
const app = express();
const Sequelize = require("sequelize");
const Data = require("./data");

const connection = new Sequelize("cartdb", "root", "", {
  dialect: "mysql"
});

const User = connection.define("User", {
  name: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING,
  address: Sequelize.STRING
});

const Post = connection.define("Post", {
  title: Sequelize.STRING,
  description: Sequelize.STRING
});

User.hasOne(Post);

connection
  .sync({
    logging: console.log,
    force: true
  })
  .then(() => {
    User.bulkCreate(Data);
  })
  .then(() => {
    Post.bulkCreate([
      {
        UserId: 1,
        title: "hello",
        description: "demo post"
      },
      {
        UserId: 2,
        title: "hello2",
        description: "demo post2"
      }
    ]);
  })
  .catch(err => console.log("koneksi error", err));

app.listen(4500, () => console.log("port berjalan di 4500"));
