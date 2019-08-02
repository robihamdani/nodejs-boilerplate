const express = require("express");
const app = express();

// parse to data
app.use(express.urlencoded({ extended: false }));

// config db
const mongoose = require("mongoose");

// mengecek dan menghubungkan database
mongoose
  .connect("mongodb://localhost:27017/boilerplate", { useNewUrlParser: true })
  .then(() => console.log(`berhasil konek dengan database`));

// models database
const User = require("./models/User");

// router biasa
app.get("/", (req, res) => res.send(`ini adalah boilerplate CRUD`));

// router post pakai async await
// untuk menginput text ke database
app.post("/post", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const newUser = new User({
      username,
      email,
      password
    });

    newUser.save();

    res.json(newUser);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

// router get pakai async await
// untuk getAll text ke API
app.get("/get", async (req, res) => {
  try {
    const getAllUser = await User.find({});

    res.json(getAllUser);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

app.delete("/:id", async (req, res) => {
  try {
    const deleteUser = await User.deleteOne({ id: req.params.id });

    res.json(deleteUser);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

app.post("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const { username } = req.body;
    await User.create({ _id: id }, { username });
    res.send("berhasil di update");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

app.listen(4500, () => console.log("port berjalan di 4500"));
