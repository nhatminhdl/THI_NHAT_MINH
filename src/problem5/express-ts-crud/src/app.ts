import express from 'express';
import path from 'path';
import methodOverride from "method-override";

import routes from './routes'
import { errorHandler } from './app/middlewares/errors';
import db from './config/db/mongoose/index';

import * as ejsHelpers from './utils/ejsHelper'
import { sortMiddleware } from './app/middlewares/sortMiddleware';
import uploadMiddleware from './app/middlewares/uploadMiddleware';

const app = express();

// Config static file
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride("_method"));
// Setup view engine
app.set("views", path.join(__dirname, "resources", "views"));
app.set("view engine", "ejs");

app.use(sortMiddleware);



app.use((req, res, next) => {
    res.locals.helpers = ejsHelpers;
    res.locals.url = req.originalUrl;
    next();
});


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(uploadMiddleware);
app.use(routes);

app.use(errorHandler);


//  Connect db
db.connect();   

export default app;
