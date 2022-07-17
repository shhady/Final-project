const router = require("express").Router();
const Team = require("../models/team");

router.post("/", async (req, res) => {
  const newTeam = new Team(req.body);
  try {
    const savedTeam = await newTeam.save();
    res.status(201).json(savedTeam);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const teams = await Team.find();
    res.status(200).json(teams);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
