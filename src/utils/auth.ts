import "dotenv/config";
import bcrypt from "bcrypt";
import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

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
export const createAccessToken = (payload: string) => {
  const accessTokenKey = process.env.ACCESS_TOKEN_KEY;
  if (!accessTokenKey) {
    throw new Error("JWT secret is not defined");
  }
  return jwt.sign(payload, accessTokenKey, accessTokenOptions);
};

export const createRefreshToken = (payload: string) => {
  const refreshTokenKey = process.env.REFRESH_TOKEN_KEY;
  if (!refreshTokenKey) {
    throw new Error("JWT secret is not defined");
  }
  return jwt.sign(payload, refreshTokenKey, refreshTokenOptions);
};

export const verifyToken = (token: string, type: "access" | "refresh") => {
  const secret =
    type === "access"
      ? process.env.ACCESS_TOKEN_KEY
      : process.env.REFRESH_TOKEN_KEY;
  if (!secret) {
    throw new Error("JWT secret is not defined");
  }
  const decoded = jwt.verify(token, secret) as JwtPayload;
  if (!decoded.sub) throw new Error("Invalid payload");
  return decoded;
};
