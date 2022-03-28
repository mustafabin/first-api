let mongoose = require("mongoose");

let countrySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  captial: [String],
  region: [String],
  population: Number,
});

module.exports = mongoose.model("Country", countrySchema);
