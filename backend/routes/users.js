const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

//register
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      name: req.body.name,
      family: req.body.family,
      phone: req.body.phone,
      email: req.body.email,
      password: hashedPassword,
    });
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(404).json("Wrong email or password");

    const validPassword = bcrypt.compare(req.body.password, user.password);
    !validPassword && res.status(404).json("Wrong password");

    res.status(200).json(user.name);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
