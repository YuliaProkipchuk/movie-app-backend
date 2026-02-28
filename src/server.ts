import express from "express";
import { Express, NextFunction, Request, Response } from "express"
import { prisma } from "./config/db";
import userRoutes from "./routes/user";
import authRoutes from "./routes/auth";
import movieRouter from './routes/movie'
import { BASE_PREFIX } from "./config";
import { ApiError } from "./types/ApiError";
import { initRoutes } from "./routes";

const app = express();

app.use(express.json());

(async function main() {
  const port = 8080;
  try {
    await prisma.$connect();
    initRoutes(app)
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    await prisma.$disconnect();
    process.exit(1);
  }
})();
