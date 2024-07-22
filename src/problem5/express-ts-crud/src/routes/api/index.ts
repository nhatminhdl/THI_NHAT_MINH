import { NextFunction, Request, Response } from "express";
import express from "express"
import CourseApiController from "../../app/controllers/api/v1/CourseApiController.";
import courseApiRouter from "./v1/courses"
interface ResponseError extends Error {
    status?: number;
}

const routes = express.Router();


routes.use("/v1/courses", courseApiRouter);



//Error handle

routes.use((err: ResponseError , req: Request, res: Response, next: NextFunction) => {
    res.status(err.status|| 500).json({
        status: err.status || 500,
        message: err.message,
    });
});

export default routes;