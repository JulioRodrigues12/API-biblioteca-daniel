// src/controllers/BookController.js
import { Book } from "../../models/Books.js";
import { Author } from "../../models/Authors.js";

export const BookController = {
  async createBook(request, reply) {
    try {
      const { title, synopsis, year, authorId } = request.body;

      const authorExists = await Author.findById(authorId);
      if (!authorExists) {
        return reply
          .status(404)
          .send({
            message: "Autor não encontrado. Não é possível cadastrar o livro.",
          });
      }

      const newBook = new Book({
        title,
        synopsis,
        year,
        author: authorId,
      });
      await newBook.save();

      await newBook.populate("author");

      return reply
        .status(201)
        .send({ message: "Livro cadastrado com sucesso", book: newBook });
    } catch (error) {
      return reply
        .status(500)
        .send({ message: "Erro ao cadastrar livro.", error: error.message });
    }
  },

  async listBooks(request, reply) {
    try {
      const books = await Book.find({}).populate("author");
      return reply.send({ books });
    } catch (error) {
      return reply
        .status(500)
        .send({ message: "Erro ao listar livros.", error: error.message });
    }
  },
};
