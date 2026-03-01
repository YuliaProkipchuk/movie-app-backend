import { prisma } from "../config/db";
import { Movie } from "../generated/prisma/client";
import { ApiError } from "../types/ApiError";
import { MovieQuery } from "../types/Movie";

export async function fetchUserMovies(userId: string, query: MovieQuery) {
  let cursorM: Movie | null = null;
  const limit = 10;
  if (query.cursor) {
    cursorM = await prisma.movie.findFirst({
      where: {
        id: query.cursor
      }
    })
  }
  if (!cursorM && query.cursor) {
    throw new ApiError('Invalid cursor', 400)
  }
  const favoriteValue = typeof query.favorite === 'string'
    ? query.favorite === 'true'
    : query.favorite;
  const result =
    await prisma.$transaction(async (tx) => {

      const movies = await tx.movie.findMany({
        where: {
          userId,
          title: query.q ? { contains: query.q, mode: "insensitive" } : undefined,
          isFavorite: favoriteValue,
          director: query.director ? { contains: query.director, mode: "insensitive" } : undefined,
          actors: query.actors?.length ? {
            some: {
              OR: query.actors.map(actor => ({
                name: {
                  contains: actor,
                  mode: "insensitive",
                },
              })),
            },
          } : undefined,
          genres: query.genres?.length
            ? {
              every: {
                name: { in: query.genres.map(g => g.toLowerCase()), mode: "insensitive" },
              },
            }
            : undefined,
          ...(cursorM && { createdAt: { lt: cursorM.createdAt } })
        },
        include: {
          genres: {
            select: {
              name: true
            }
          },
          actors:{
            select: {
              name: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        },
        take: limit
      });
      const count = await tx.movie.count({
        where: {
          userId,
          isFavorite: favoriteValue,
          title: query.q ? { contains: query.q, mode: "insensitive" } : undefined,
          director: query.director ? { contains: query.director, mode: "insensitive" } : undefined,
          actors: query.actors?.length ? {
            every: {
              name: { in: query.actors.map(a => a.toLowerCase()), mode: "insensitive" },
            },
          }
            : undefined,
          genres: query.genres?.length
            ? {
              every: {
                name: { in: query.genres.map(g => g.toLowerCase()), mode: "insensitive" },
              },
            }
            : undefined,
        },
      })

      return {
        movies,
        total: count,
        hasMore: movies.length === limit,
        nextCursor: movies.length === limit ? movies[limit - 1].id : null
      }
    })
  return result
}
