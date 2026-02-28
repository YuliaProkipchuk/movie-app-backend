import { Express, NextFunction, Request, Response } from "express"
import userRoutes from "./routes/user";
import authRoutes from "./routes/auth";
import movieRouter from './routes/movie'
import { BASE_PREFIX } from "./config";
import { ApiError } from "./types/ApiError";

export const initRoutes = (app: Express) => {
    app.use(`${BASE_PREFIX}/user`, userRoutes);
    app.use(`${BASE_PREFIX}/auth`, authRoutes);
    app.use(`${BASE_PREFIX}/movie`, movieRouter);

    app.use((req, res) => {
        res.status(404).json({
            message: 'Page not found'
        });
    });
    app.use((err: ApiError, req: Request, res: Response, next: NextFunction) => {
        console.log(err)
        if (err instanceof ApiError) {
            res.status(err.statusCode).json({
                message: err.message,
            });
        } else {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    });
    return;
}