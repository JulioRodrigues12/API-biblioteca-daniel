// src/routes/index.js
import { AuthorController } from "../controllers/AuthorController.js";
import { UserController } from "../controllers/UsersController.js";
import { BookController } from "../controllers/BookController.js";
import { LoanController } from "../controllers/LoanController.js";

export async function routes(app) {
  app.post("/users", UserController.createUser);
  app.get("/users", UserController.listUsers);

  app.post("/authors", AuthorController.createAuthor);
  app.get("/authors", AuthorController.listAuthors);

  app.post("/books", BookController.createBook);
  app.get("/books", BookController.listBooks);

  app.post("/loans", LoanController.createLoan);
}
