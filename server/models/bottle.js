const mongoose = require("mongoose");

const bottleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  quality: {
    type: String,
    required: true,
  },
  bottleRef: {
    type: String,
    required: true,
  },
  bottleType: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  wineType: {
    type: String,
    required: true,
  }
});

const Bottle = mongoose.model("Bottle", bottleSchema);

module.exports = Bottle;
