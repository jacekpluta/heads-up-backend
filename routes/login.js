const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  // const user = await User.find({ email: email });
  console.log(req);
  res.status(200).send({ message: "Password and email address are correct" });
});

module.exports = router;
