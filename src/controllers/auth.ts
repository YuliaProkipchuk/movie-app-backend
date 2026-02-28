import { NextFunction, Response, Request, CookieOptions } from "express";
import { login, register, refresh } from "../services/auth";
import { RequestWithUser } from "../types/Request";
const options: CookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "lax",
  expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
};
export const signInController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email, password } = req.body;
  try {
    const result = await login(email, password);
    res.cookie("refresh_token", result.refreshToken, options);
    return res.status(200).json({
      status: "success",
      message: "User signed in successfully",
      data: {
        accessToken: result.accessToken,
      },
    });
  } catch (error) {
    next(error);
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
    res.cookie("refresh_token", result.refreshToken, options);
    return res.status(201).json({
      status: "success",
      message: "User created successfully",
      data: {
        accessToken: result.accessToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const refreshController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const cookie = req.cookies.refresh_token;
    if (!cookie) {
      throw new Error("Unauthorized");
    }
    const tokens = await refresh(cookie);
    res.cookie("refresh_token", tokens.refreshToken, options);
    return res.status(200).json({
      status: "success",
      message: "Restored users session",
      data: {
        accessToken: tokens.accessToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const logoutController = (req: RequestWithUser,
  res: Response,
  next: NextFunction) => {
  res.clearCookie('refresh_token');
  return res.sendStatus(200)
}
