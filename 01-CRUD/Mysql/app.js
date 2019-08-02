const express = require("express");
const app = express();

// parse to data
app.use(express.urlencoded({ extended: false }));

// config db
const db = require("./config/db");

// mengecek dan menghubungkan database
db.authenticate().then(() =>
  console.log(`berhasil terkoneksi dengan database`)
);

// load models database
const User = require("./models/User");

// router biasa
app.get("/", (req, res) => res.send(`ini adalah boilerplate CRUD`));

// router post pakai async await
// untuk menginput text ke database
app.post("/post", async (req, res) => {
  try {
    //   destructuring object
    const { username, email, password } = req.body;

    // initialize models database
    const newUser = new User({
      username,
      email,
      password
    });

    // await = menjalankan kode models user
    await newUser.save();

    // menampilkan newuser ketika di save postman
    res.json(newUser);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

// router get pakai async await
// untuk melihat semua yang terinput di database
app.get("/get", async (req, res) => {
  try {
    // mendapatkan semua user
    const getAllUser = await User.findAll({});

    // menyuruh get all user ketika di save postman
    res.json(getAllUser);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

// mengahpus parameter
app.delete("/delete/:id", async (req, res) => {
  try {
    // delete user dan hapus berdasarkan id
    const deleteUser = await User.destroy({
      where: { id: req.params.id }
    });

    await deleteUser;

    res.json("berhasil di hapus");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

// mengupdate username
app.put("/:id", async (req, res) => {
  try {
    const { username } = req.body;
    const id = req.params.id;
    const updateUser = await User.update(
      { username },
      {
        where: {
          id: id
        }
      }
    );

    await updateUser;

    res.json(`berhasil di update`);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

app.listen(5000, () => console.log("port berjalan di 4500"));
