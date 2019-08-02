const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");

router.get("/", (req, res) => res.send("berhasil di buka login"));
router.get("/dashboard", (req, res) => res.send("selamat datang di dashoard"));

router.get("/login", (req, res) => res.send("gagal login"));

// Route    /Register
// status   PUBLIC
router.post(
  "/register",
  [
    // username
    check("username")
      .isLength({ min: 5 })
      .withMessage("must be at least 5 chars long"),
    // Email
    check("email")
      .isLength({ min: 4 })
      .withMessage("must be at least 5 chars long")
      .isEmail()
      .withMessage("must email valid only"),
    // password
    check("password")
      .isLength({ min: 5 })
      .withMessage("must be at least 5 chars long")
  ],
  async (req, res) => {
    try {
      const { username, email, password } = req.body;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      const newUser = new User({
        username,
        email,
        password
      });

      // user findone
      const sameEmail = await User.findOne({ where: { email: email } });

      if (sameEmail) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      // encrypt password
      const salt = await bcrypt.genSalt(10);

      newUser.password = await (password, salt);

      await newUser.save();

      res.send(newUser);
    } catch (err) {
      console.error(err.message);
      res.status(500).send(`server error`);
    }
  }
);

// Route    /findAll
// status   PRIVATE
router.get("/find", async (req, res) => {
  try {
    const Users = await User.findAll({});

    res.json(Users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

router.delete("/:id", async (req, res) => {
  const deleteUser = await User.destroy({
    where: { id: req.params.id }
  });

  await deleteUser;

  res.json("berhasil di hapus");
});

module.exports = router;
