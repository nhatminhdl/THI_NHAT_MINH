
import express from "express"

import SiteController from "../../app/controllers/web/SiteController";
import courseRouter from "./courses";


const routes = express.Router();


routes.get("/", SiteController.show);

routes.use("/courses", courseRouter);



//Error handle

routes.use(((err, req, res, next) => {
   
    res.status( err.status ||500).json({
        status:  err.status || 500,
        message: err.message,
    });
}) as express.ErrorRequestHandler);

export default routes;