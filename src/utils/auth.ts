import "dotenv/config";
import bcrypt from "bcrypt";
import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import { ApiError } from "../types/ApiError";

const accessTokenOptions: SignOptions = {
  expiresIn: "15m",
};
const refreshTokenOptions: SignOptions = {
  expiresIn: "7d",
};
export const comparePassword = async (
  password: string,
  hashedPassword: string,
) => {
  return await bcrypt.compare(password, hashedPassword);
};
export const hash = async (password: string) => {
  const saltRounds = 12;
  return await bcrypt.hash(password, saltRounds);
};
export const createAccessToken = (data: string) => {
  const accessTokenKey = process.env.ACCESS_TOKEN_KEY;
  if (!accessTokenKey) {
    throw new ApiError('Server configuration error', 500)
  }
  return jwt.sign({ sub: data }, accessTokenKey, accessTokenOptions);
};

export const createRefreshToken = (data: string) => {
  const refreshTokenKey = process.env.REFRESH_TOKEN_KEY;
  if (!refreshTokenKey) {
    throw new ApiError('Server configuration error', 500)
  }
  return jwt.sign({ sub: data }, refreshTokenKey, refreshTokenOptions);
};

export const verifyToken = (token: string, type: "access" | "refresh") => {
  const secret =
    type === "access"
      ? process.env.ACCESS_TOKEN_KEY
      : process.env.REFRESH_TOKEN_KEY;
  if (!secret) {
    throw new ApiError('Server configuration error', 500)
  }
  const decoded = jwt.verify(token, secret) as JwtPayload;
  if (!decoded.sub) throw new ApiError("Invalid token payload", 401);
  return JSON.parse(decoded.sub);
};
