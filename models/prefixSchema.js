const mongoose = require("mongoose");

const prefixSchema = new mongoose.Schema({
  guildId: {
    type: String,
    required: true,
    unique: true
  },
  prefix: {
    type: String,
    default: process.env.DEFAULT_PREFIX || "r?"
  }
});

module.exports = mongoose.model("Prefix", prefixSchema);
