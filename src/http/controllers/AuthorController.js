// src/controllers/AuthorController.js
import { Author } from "../../models/Authors.js";

export const AuthorController = {
  async createAuthor(request, reply) {
    try {
      const { name, birthDate, sex, writingGenre } = request.body;

      const newAuthor = new Author({ name, birthDate, sex, writingGenre });
      await newAuthor.save();

      return reply
        .status(201)
        .send({ message: "Autor cadastrado com sucesso", author: newAuthor });
    } catch (error) {
      if (error.code === 11000) {
        return reply
          .status(409)
          .send({ message: "Erro: Autor com este nome já existe." });
      }
      return reply
        .status(500)
        .send({ message: "Erro ao cadastrar autor.", error: error.message });
    }
  },

  async listAuthors(request, reply) {
    try {
      const authors = await Author.find({});
      return reply.send({ authors });
    } catch (error) {
      return reply
        .status(500)
        .send({ message: "Erro ao listar autores.", error: error.message });
    }
  },
};
