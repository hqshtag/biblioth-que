const mongoose = require("mongoose");
const BookSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  pages: {
    type: Number,
    min: 9,
  },
});

module.exports = {
  schema: BookSchema,
  Book: mongoose.model("book", BookSchema),
};
