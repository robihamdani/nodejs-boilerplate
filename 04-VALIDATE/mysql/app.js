const express = require("express");
const app = express();
const db = require("./config/db");
const passport = require("passport");
const session = require("express-session");

app.use(express.urlencoded({ extended: false }));

db.authenticate().then(() =>
  console.log(`berhasil terkoneksi dengan database`)
);

// Express session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
  })
);

// config pasportjs
app.use(passport.initialize());

// root url
app.use("/", require("./routes/Login"));

app.listen(4500, () => console.log("port opened 4500"));
