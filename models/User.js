const { Schema, model } = require("mongoose");

const schema = new Schema({
  FIO: { type: String, required: true },
  description: { type: String, required: true },
  pathImage: { type: String, required: true },
  date: { type: String, required: true },
  publications: { type: Array, required: true },
});

module.exports = model("User", schema);
