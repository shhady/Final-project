const router = require("express").Router();
const Court = require("../models/court");

router.post("/", async (req, res) => {
  const newCourt = new Court(req.body);
  try {
    const savedCourt = await newCourt.save();
    res.status(201).json(savedCourt);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all courts//

router.get("/", async (req, res) => {
  try {
    const courts = await Court.find();
    res.status(200).json(courts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
