import "dotenv/config";
import { app } from "./app.js";
import cors from "@fastify/cors";
import { connectMongo } from "./database/index.js";
import { routes } from "./http/routes/index.js";

async function server() {
  app.register(cors, {
    origin: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  });

  app
    .listen({
      host: "0.0.0.0",
      port: process.env.PORT,
    })
    .then(() => {
      console.log("HTTP Server is running on PORT:" + process.env.PORT);
    });

  //await connectMongo();
}

server();
