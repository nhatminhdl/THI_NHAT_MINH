import {NextFunction, Request, Response} from "express"
import CourseModel from "../../models/Course";


class CourseController{
    async show(req: Request, res: Response, next: NextFunction) {
        await CourseModel
            .find({})
            .sortable(req)
            .then((course) =>
                res.render("layouts/main", {
                    courses: course,
                    page: 'home'
                })
            )
            .catch(next);
    }

    async create(req: Request, res: Response, next: NextFunction) {
        const formData = req.body ;
        const files = req.files as { [key: string]: Express.Multer.File[] };
       
        if (files.image && files.image[0]) {
            formData.image = `/uploads/images/${files.image[0].filename}`;
        }

        const course = new CourseModel(formData);

        try {
            await course.save();
            res.redirect('/');
        } catch (error) {
            console.log('a',error)
        }
        
    }

    //[PUT] /coures/:id
    update(req:Request, res: Response, next: NextFunction) {
        
        const formData = req.body;
        const files = req.files as { [key: string]: Express.Multer.File[] };
       
        if (files.image && files.image[0]) {
            formData.image = `/uploads/images/${files.image[0].filename}`;
        }
        CourseModel
            .updateOne({ _id: req.params.id }, formData)
            .then(() => res.redirect("/"))
            .catch(next);
    }

    //[DELETE] /coures/:id
    forcedestroy(req:Request, res: Response, next: NextFunction) {
        CourseModel
            .deleteOne({ _id: req.params.id })
            .then(() => res.redirect("back"))
            .catch(next);
    }

   //[DELETE] /coures/:id
   forcedestroyAll(req:Request, res: Response, next: NextFunction) {
        const courseIds = req.body.courseIds;
        CourseModel
            .deleteMany({ _id: {$in : courseIds} })
            .then(() => res.redirect("back"))
            .catch(next);
    }
}

export default new CourseController