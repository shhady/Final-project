const mongoose = require("mongoose");

const FreeCourtSchema = new mongoose.Schema(
  {
    courtType: {
      type: String,
      required: true,
    },
    address: { type: String, required: true },
    lat: { type: Number },
    lng: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model("freecourt", FreeCourtSchema);
