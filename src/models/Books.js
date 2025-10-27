// src/models/Book.js
import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  synopsis: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
    required: true,
  },
  isAvailable: {
    type: Boolean,
    default: true,
    required: true,
  },
  expectedReturnDate: {
    type: Date,
    default: null,
  },
});

export const Book = mongoose.model("Book", BookSchema, "Books");
