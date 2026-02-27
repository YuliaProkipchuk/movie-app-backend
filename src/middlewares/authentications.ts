import { NextFunction, Request, Response } from "express";
import { AuthRequest } from "../types/Request";
import { verifyToken } from "../utils/auth";
import { prisma } from "../config/db";

export const authentication = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({
        status: "failed",
        message: "Unaithorized Authentication",
      });
    }
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        status: "failed",
        message: "Unaithorized Authentication",
      });
    }

    const decoded = verifyToken(token, "access");
    if (!decoded?.sub) return res.sendStatus(401);
    const user = await prisma.user.findUnique({
      where: {
        id: decoded.sub,
      },
      select: {
        id: true,
        movie: true,
      },
    });
    if (!user) {
      return res.status(401).json({
        status: "failed",
        message: "Unaithorized Authentication",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      status: "failed",
      message: "Unaithorized Authentication",
    });
  }
};
