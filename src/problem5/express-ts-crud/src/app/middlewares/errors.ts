import { NextFunction, Request, Response } from "express";
import type { ErrorRequestHandler } from "express";
interface ResponseError extends Error {
    status?: number;
}
export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    console.log(err.status);
    
    res.status( err.status ||500).json({
        status:  err.status || 500,
        message: err.message,
    });
};
