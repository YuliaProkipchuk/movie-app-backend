import { prisma } from "../config/db";
import { Movie, MovieInput } from "../types/Movie";

export const deleteById = async (movieId: string, userId: string) => {
  await prisma.movie.delete({
    where: {
      id: movieId,
      userId
    },
  });
};

export const createMovie = async (data: MovieInput, userId: string) => {
  try {

    return await prisma.movie.create({
      data: {
        title: data.title as string,
        description: data.description || '',
        director: data.director || '',
        actors: data.actors,
        image: data.image || '',
        isFavorite: !!data.isFavorite,
        rating: data.rating,
        genres: {
          connectOrCreate: (data.genre ?? []).map(name => ({
            where: { name },
            create: { name }
          }))
        },
        releasedAt: data.release_date ? new Date(data.release_date) : new Date(),
        userId
      }
    })
  } catch (error) {

  }
}

export const updateMovie = async () => {

}

export const toggleMovieFavorite = async (isFavorite: boolean, userId: string, movieId: string) => {
  try {
    return await prisma.movie.update({
      where: {
        id: movieId,
        userId: userId
      }, data: {
        isFavorite
      }
    })
  } catch (error) {
    throw new Error('Something went wrong')
  }
}