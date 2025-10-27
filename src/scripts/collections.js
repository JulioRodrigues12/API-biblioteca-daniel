import mongoose from "mongoose";
import { connectMongo } from "../database/index.js";

import { Author } from "../models/Authors.js";
import { User } from "../models/Users.js";
import { Book } from "../models/Books.js";
import { Loan } from "../models/Loans.js";

const models = [Author, User, Book, Loan];

async function resetCollections() {
  await connectMongo();

  console.log("--- Iniciando script de coleções ---");

  try {
    for (const Model of models) {
      const collectionName = Model.collection.collectionName;

      await Model.deleteMany({});

      console.log(`Coleção '${collectionName}' excluída (zerada).`);
    }

    console.log("--- Todas as coleções foram resetadas com sucesso. ---");
  } catch (error) {
    console.error("Erro ao resetar as coleções:", error.message);
    process.exit(1);
  }
}

resetCollections();
