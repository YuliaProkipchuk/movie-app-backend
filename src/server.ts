import express from "express";
import { prisma } from "./config/db";

const app = express();

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
