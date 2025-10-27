// src/controllers/LoanController.js
import { Book } from "../../models/Books.js";
import { Loan } from "../../models/Loans.js";
import { User } from "../../models/Users.js";

const calculateExpectedReturnDate = () => {
  const date = new Date();
  date.setDate(date.getDate() + 3);
  return date;
};

const isPastDate = (date) => {
  return new Date(date) < new Date();
};

export const LoanController = {
  async createLoan(request, reply) {
    try {
      const { bookId, userId } = request.body;

      const book = await Book.findById(bookId);
      const user = await User.findById(userId);

      if (!book) {
        return reply.status(404).send({ message: "Livro não encontrado." });
      }
      if (!user) {
        return reply.status(404).send({ message: "Usuário não encontrado." });
      }

      const today = new Date();
      const expectedReturnDate = calculateExpectedReturnDate();

      let canProceedWithLoan = book.isAvailable;

      if (
        !book.isAvailable &&
        book.expectedReturnDate &&
        isPastDate(book.expectedReturnDate)
      ) {
        console.log(
          `Livro com devolução atrasada (Prevista: ${
            book.expectedReturnDate.toISOString().split("T")[0]
          }). Empréstimo permitido.`
        );
        canProceedWithLoan = true;
      }

      if (canProceedWithLoan) {
        const newLoan = new Loan({
          user: user.name,
          book: book.title,
          loanDate: today.toISOString().split("T")[0],
          returnDate: expectedReturnDate.toISOString().split("T")[0],
        });
        await newLoan.save();

        book.isAvailable = false;
        book.expectedReturnDate = expectedReturnDate;
        await book.save();

        return reply
          .status(201)
          .send({
            message: "Empréstimo realizado com sucesso.",
            loan: newLoan,
            bookStatus: book,
          });
      } else {
        return reply.status(409).send({
          message:
            "Solicitação de emprestimo negada. O livro se encontra emprestado atualmente.",
          expectedReturn: book.expectedReturnDate,
        });
      }
    } catch (error) {
      return reply
        .status(500)
        .send({
          message: "Erro ao realizar empréstimo.",
          error: error.message,
        });
    }
  },
};
