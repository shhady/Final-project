const mongoose = require("mongoose");

const CourtSchema = new mongoose.Schema(
  {
    courtType: {
      type: String,
      required: true,
    },
    address: { type: String },
    lat: { type: Number },
    lng: { type: Number },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    // img: {
    //   type: Image,
    // },
    from: {
      type: String,
      // required: true,
    },
    to: {
      type: String,
      // required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("court", CourtSchema);
