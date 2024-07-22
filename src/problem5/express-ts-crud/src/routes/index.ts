import { NextFunction, Request, Response } from "express";
import express from "express";

import * as  routeApi from "./api";
import * as routeWeb from './web';


const routes = express.Router();


routes.use("/", routeWeb.default);
routes.use("/api", routeApi.default);


//Error handle

routes.use(((err, req, res, next) => {
    
    res.status( err.status ||500).json({
        status:  err.status || 500,
        message: err.message,
    });
}) as express.ErrorRequestHandler);

export default routes;