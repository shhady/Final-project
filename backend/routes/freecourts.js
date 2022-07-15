const router = require("express").Router();
const FreeCourt = require("../models/freecourt");

router.post("/", async (req, res) => {
  const newFreeCourt = new FreeCourt(req.body);
  try {
    const savedCourt = await newFreeCourt.save();
    res.status(201).json(savedCourt);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all courts//

router.get("/", async (req, res) => {
  try {
    const courts = await FreeCourt.find();
    res.status(200).json(courts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
