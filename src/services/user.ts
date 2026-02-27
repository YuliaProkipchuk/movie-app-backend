import { prisma } from "../config/db";

export async function fetchUserMovies(userId: string) {
  return await prisma.movie.findMany({
    where: {
      userId,
    },
  });
}
