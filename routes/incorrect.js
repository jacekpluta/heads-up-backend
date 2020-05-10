const express = require("express");
const router = express.Router();

router.get("/", function (req, res, next) {
  let errors = [];

  errors.push("Password or email address is incorrect");

  if (errors.length > 0) {
    res.status(200).send({ error: errors });
  }
});

module.exports = router;
