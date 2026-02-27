import { prisma } from "../config/db";
import {
  comparePassword,
  createAccessToken,
  createRefreshToken,
  hash,
} from "../utils/auth";

export const login = async (email: string, password: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) {
      throw new Error("Invalid email or password");
    }
    const isPassValid = await comparePassword(password, user.password);
    if (!isPassValid) {
      throw new Error("Invalid email or password");
    }
    const payload = JSON.stringify({ sub: user.id });
    const accessToken = createAccessToken(payload);
    const refreshToken = createRefreshToken(payload);

    return {
      accessToken,
      refreshToken,
    };
  } catch (error) {
    throw new Error("Something went wrong");
  }
};

export const register = async (
  email: string,
  password: string,
  username: string,
) => {
  try {
    const userExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (userExists) {
      throw new Error("User with this email already exists");
    }
    const hashedPassword = await hash(password);
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        username,
      },
    });
    const payload = JSON.stringify({ sub: newUser.id });
    const accessToken = createAccessToken(payload);
    const refreshToken = createRefreshToken(payload);
    return {
      accessToken,
      refreshToken,
    };
  } catch (error) {
    throw new Error("Registration failed");
  }
};
