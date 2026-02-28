import { Request, Response, NextFunction } from "express";
import { ZodError, ZodObject } from "zod";

type ValidationTarget = "body" | "query" | "params";

export const validate =
  (schema: ZodObject, target: ValidationTarget = "body") =>
    (req: Request, res: Response, next: NextFunction) => {
      try {

        const parsed = schema.parse(req[target]);
        Object.assign(req[target], parsed);
        next();
      } catch (error) {
        if (error instanceof ZodError) {
          return res.status(400).json({
            message: "Invalid data",
            errors: error.issues.map((issue) => ({
              path: issue.path,
              message: issue.message,
            })),
          });
        }

        next(error);
      }
    };
