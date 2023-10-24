const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minLength: 1,
  },

  content: {
    type: String,
    required: true,
    minLength: 1,
  },
  dateUpdated: {
    type: Date,
    default: Date.now(),
  },
  dateCreated: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Post", postSchema);
