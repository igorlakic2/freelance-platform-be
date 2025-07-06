const mongoose = require("mongoose");
const ROLES = require("../constants/roles");

const Schema = mongoose.Schema;

const usersSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: Object.values(ROLES),
    required: true,
  },
});

module.exports = mongoose.model("User", usersSchema);
