import { NextFunction, Response, Request } from "express";
import { prisma } from "../config/db";
import { login, register } from "../services/auth";

export const sighInController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email, password } = req.body;
  try {
    const result = await login(email, password);
    res.cookie("refresh_token", result.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });
    return res.status(200).json({
      status: "success",
      message: "User signed in successfully",
      data: {
        accessToken: result.accessToken,
      },
    });
  } catch (error) {
    next();
  }
};

export const signUpController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email, password, username } = req.body;
  try {
    const result = await register(email, password, username);
    res.cookie("refresh_token", result.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });
    return res.status(201).json({
      status: "success",
      message: "User created successfully",
      data: {
        accessToken: result.accessToken,
      },
    });
  } catch (error) {
    next();
  }
};
