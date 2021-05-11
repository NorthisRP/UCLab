const { Schema, model } = require("mongoose");

const schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  pathImage: { type: String, required: true },
});

module.exports = model("Project", schema);
