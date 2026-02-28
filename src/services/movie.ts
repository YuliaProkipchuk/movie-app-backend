import { prisma } from "../config/db";
import { ApiError } from "../types/ApiError";
import { MovieEdit, MovieInput } from "../types/Movie";

export const getMovie = async (userId: string, movieId: string) => {
  return prisma.movie.findUnique({
    where: {
      id: movieId,
      userId
    }
  })
}
export const deleteById = async (movieId: string, userId: string) => {
  const result = await prisma.movie.deleteMany({
    where: { id: movieId, userId },
  });

  if (result.count === 0) {
    throw new ApiError("Not found", 404);
  }
};

export const createMovie = async (data: MovieInput, userId: string) => {
  return await prisma.movie.create({
    data: {
      title: data.title,
      description: data.description,
      director: data.director,
      actors: data.actors,
      image: data.image,
      isFavorite: data.isFavorite,
      rating: data.rating,
      genres: {
        connectOrCreate: (data.genres ?? []).map(name => {
          const lowerName = name.toLowerCase()
          return ({
            where: { name: lowerName },
            create: { name: lowerName }
          })
        })
      },
      releasedAt: data.releasedAt,
      userId
    },
  })
}

export const updateMovie = async (userId: string, movieId: string, data: MovieEdit) => {
  return await prisma.$transaction(async (tx) => {
    if (data.genres?.length) {
      await tx.genre.createMany({
        data: data.genres.map(name => ({
          name: name.toLowerCase()
        })),
        skipDuplicates: true
      });
    }

    const movie = await tx.movie.update({
      where: { id: movieId, userId },
      data: {
        title: data.title,
        description: data.description,
        director: data.director,
        image: data.image,
        isFavorite: data.isFavorite,
        rating: data.rating,
        status: data.status,
        ...(data.actors && { actors: data.actors }),
        ...(data.genres && {
          genres: {
            set: data.genres.map(name => ({
              name: name.toLowerCase()
            }))
          }
        })
      }
    });

    return movie;
  });
}

export const toggleMovieFavorite = async (isFavorite: boolean, userId: string, movieId: string) => {
  const result = await prisma.movie.update({
    where: {
      id: movieId,
      userId
    },
    data: {
      isFavorite: isFavorite
    }
  })

  return result
}