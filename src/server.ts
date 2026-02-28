import express from "express";
import { prisma } from "./config/db";
import userRoutes from "./routes/user";
import authRoutes from "./routes/auth";
import movieRouter from './routes/movie'
import { BASE_PREFIX } from "./config";
const app = express();

app.use(express.json());
app.use(`${BASE_PREFIX}/user`, userRoutes);
app.use(`${BASE_PREFIX}/auth`, authRoutes);
app.use(`${BASE_PREFIX}/movie`, movieRouter);

(async function main() {
  const port = 8080;
  try {
    await prisma.$connect();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    await prisma.$disconnect();
    process.exit(1);
  }
})();
