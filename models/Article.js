const { Schema, model } = require("mongoose");

const schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  category: { type: String, required: true },
  pathImage: { type: String, required: true },
  pathFile: { type: String, required: false },
});

module.exports = model("Article", schema);
