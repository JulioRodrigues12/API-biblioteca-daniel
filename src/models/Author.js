// src/models/Author.js
import mongoose from "mongoose";

const AuthorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  birthDate: {
    type: Date,
    required: true,
  },
  sex: {
    type: String,
    required: true,
  },
  writingGenre: {
    type: String,
    required: true,
    enum: ["Novel", "Poetry", "Fantasy", "Fiction", "Mystery", "Suspense"],
  },
});

export const Author = mongoose.model("Author", AuthorSchema, "Authors");
