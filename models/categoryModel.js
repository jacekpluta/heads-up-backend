var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var categorySchema = new Schema(
  {
    email: {
      type: String,
      unique: false,
      required: true,
    },
    name: {
      type: String,
      unique: false,
      required: true,
    },
    description: {
      type: String,
      unique: false,
      required: false,
    },
    questions: {
      type: Array,
      unique: false,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = categorySchema;
