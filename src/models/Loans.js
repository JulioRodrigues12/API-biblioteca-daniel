// src/models/Loan.js
import mongoose from "mongoose";

const LoanSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  book: {
    type: String,
    required: true,
  },
  loanDate: {
    type: String,
    required: true,
  },
  returnDate: {
    type: String,
    required: true,
  },
});

export const Loan = mongoose.model("Loan", LoanSchema, "Loans");
