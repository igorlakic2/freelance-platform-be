const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const jobSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  technologies: {
    type: [
      {
        value: {
          type: String,
          required: true,
        },
      },
    ],
    required: true,
    validate: {
      validator: (v) => v.length > 0,
      message: "At least one technology is required.",
    },
  },
});

module.exports = mongoose.model("Job", jobSchema);
