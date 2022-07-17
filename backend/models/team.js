const mongoose = require("mongoose");

const TeamSchema = new mongoose.Schema(
  {
    time: {
      type: String,
      required: true,
      unique: true,
    },
    players: { type: Number, required: true },
    missing: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("team", TeamSchema);
