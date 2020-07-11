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
  language: {
    type: String,
  },
  year: {
    type: Number,
    min: 1000,
    max: 3000,
  },
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
});

module.exports = {
  schema: BookSchema,
  Book: mongoose.model("book", BookSchema),
};
