const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const validator = require("email-validator");
const bcrypt = require("bcryptjs");

router.post("/", async (req, res) => {
  const { email, password, passwordRepeat } = req.body;
  let errors = [];

  if ((!email, !password, !passwordRepeat)) {
    errors.push("Please fill in all fields  ");
  }

  if (password !== passwordRepeat) {
    errors.push("Passwords do not match");
  }

  if (!validator.validate(email)) {
    errors.push("Enter correct email address");
  }

  if (validator.validate(email)) {
    const user = await User.find({ email: email });

    if (user[0]) {
      errors.push("User with same email address already exists");
    }
  }

  if (password.length < 6) {
    errors.push("Password should be at least 6 characters");
  }

  if (password.length > 25) {
    errors.push("Password should be at maximum 25 characters");
  }

  if (errors.length > 0) {
    res.json({ error: errors });
  } else {
    const user = new User({
      email: email,
      password: password,
      passwordRepeat: passwordRepeat,
    });

    //hash password
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) throw err;

        const user = new User({
          email: email,
          password: hash,
          passwordRepeat: passwordRepeat,
        });

        user
          .save()
          .then((user) => {
            res.json(user);
          })
          .catch((err) => {
            console.log(err);
          });
      });
    });
  }
});

module.exports = router;
