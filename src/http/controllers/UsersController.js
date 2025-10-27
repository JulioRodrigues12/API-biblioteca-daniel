// src/controllers/UserController.js
import { User } from "../../models/Users.js";

export const UserController = {
  async createUser(request, reply) {
    try {
      const { name, birthDate, sex, address } = request.body;

      const newUser = new User({ name, birthDate, sex, address });
      await newUser.save();

      return reply
        .status(201)
        .send({ message: "Usuário cadastrado com sucesso", user: newUser });
    } catch (error) {
      if (error.code === 11000) {
        return reply
          .status(409)
          .send({ message: "Erro: Usuário com este nome já existe." });
      }
      return reply
        .status(500)
        .send({ message: "Erro ao cadastrar usuário.", error: error.message });
    }
  },

  async listUsers(request, reply) {
    try {
      const users = await User.find({});
      return reply.send({ users });
    } catch (error) {
      return reply
        .status(500)
        .send({ message: "Erro ao listar usuários.", error: error.message });
    }
  },
};
