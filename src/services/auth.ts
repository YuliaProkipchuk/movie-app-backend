import { prisma } from "../config/db";
import { ApiError } from "../types/ApiError";
import {
  comparePassword,
  createAccessToken,
  createRefreshToken,
  hash,
  verifyToken,
} from "../utils/auth";

export const login = async (email: string, password: string) => {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) {
      throw new ApiError("Invalid email or password", 400);
    }
    const isPassValid = await comparePassword(password, user.password);
    if (!isPassValid) {
      throw new ApiError("Invalid email or password", 400);
    }
    const payload = user.id;
    const accessToken = createAccessToken(payload);
    const refreshToken = createRefreshToken(payload);

    return {
      accessToken,
      refreshToken,
    };
};

export const register = async (
  email: string,
  password: string,
  username: string,
) => {
  const userExists = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (userExists) {
    throw new ApiError("User with this email already exists", 400);
  }
  const hashedPassword = await hash(password);
  const newUser = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      username,
    },
  });
  const payload = newUser.id;
  const accessToken = createAccessToken(payload);
  const refreshToken = createRefreshToken(payload);
  return {
    accessToken,
    refreshToken,
  };

};

export const refresh = async (cookie: string) => {
    const decoded = verifyToken(cookie, "refresh");
    const user = await prisma.user.findUnique({
      where: {
        id: decoded.sub,
      },
    });
    if (!user) {
      throw new ApiError("Unauthorized", 401);
    }
    const payload = user.id;
    const accessToken = createAccessToken(payload);
    const refreshToken = createRefreshToken(payload);
    return {
      accessToken,
      refreshToken,
    };
};
