const mongoose = require("mongoose");

const candModel = new mongoose.Schema({
  name: String,
  email: String,
  test_score: {
    first_round: Number,
    second_round: Number,
    third_round: Number,
  },
  average:Number,
  total:Number
});

const cands = mongoose.model("cands", candModel);

module.exports = { cands };
