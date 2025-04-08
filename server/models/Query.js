const mongoose = require("mongoose");
const validator = require("validator");

const querySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, "Invalid email"],
  },
  subject: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Query", querySchema);
