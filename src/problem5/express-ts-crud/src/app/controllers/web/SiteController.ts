import {NextFunction, Request, Response} from "express"
import CourseModel from "../../models/Course";
import { mongooseToObject, multipleMongooseToObject } from "../../../utils/mongoose";


class SiteController {

    async show(req: Request, res: Response, next: NextFunction) {
        await CourseModel
            .find({})
            .sortable(req)
            .then((course) =>
                res.render("layouts/main", {
                    courses: multipleMongooseToObject(course),
                    page: 'home'
                })
            )
            .catch(next);
    }
}

export default new SiteController