import { NextFunction, Request, Response } from "express";
import express from "express"
import CourseApiController from "../../../app/controllers/api/v1/CourseApiController.";

interface ResponseError extends Error {
    status?: number;
}

const routes = express.Router();


routes.get("/", CourseApiController.get);
routes.get("/:id", CourseApiController.getById);
routes.post("/",CourseApiController.create)
routes.put("/:id",CourseApiController.update)
routes.delete('/:id',CourseApiController.forcedestroy)



//Error handle

routes.use((err: ResponseError , req: Request, res: Response, next: NextFunction) => {
    res.status(err.status|| 500).json({
        status: err.status || 500,
        message: err.message,
    });
});

export default routes;