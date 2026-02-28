import { NextFunction, Request, Response } from "express";
import { RequestWithUser } from "../types/Request";
import { verifyToken } from "../utils/auth";
import { prisma } from "../config/db";

export const authentication = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader?.startsWith("Bearer ")) {
      res.status(401).json({
        status: "failed",
        message: "Unaithorized Authentication",
      });
      return;
    }
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      res.status(401).json({
        status: "failed",
        message: "Unaithorized Authentication",
      });
      return;
    }

    const decoded = verifyToken(token, "access");
    if (!decoded?.sub) {
      res.status(401).json({
        status: "failed",
        message: "Unaithorized Authentication",
      });
      return;
    }
    const user = await prisma.user.findFirst({
      where: {
        id: decoded.sub,
      },
      include: {
        movies: true
      }
    });
    if (!user) {
      res.status(401).json({
        status: "failed",
        message: "Unaithorized Authentication",
      });
      return;
    }
    req.user = user;
    return next();
  } catch (error) {
    res.status(401).json({
      status: "failed",
      message: "Unaithorized Authentication",
    });
  }
};
