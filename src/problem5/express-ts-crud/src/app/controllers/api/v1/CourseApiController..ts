import {NextFunction, Request, Response} from "express"
import CourseModel from "../../../models/Course";
import { mongooseToObject, multipleMongooseToObject } from "../../../../utils/mongoose";

class CourseApiController{
    
    //[GET] /
    async get(req: Request, res: Response, next: NextFunction) {
        try {
            const courses = await CourseModel
            .find({})
            .sortable(req);
            res.status(200).json(courses);
        } catch (error) {
            res.status(500).json({ message: 'Error listing courses', error });
        }
        
    }

    //[GET] /:id
    async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const course = await CourseModel
            .findById(req.params.id)
        
            res.status(200).json(course);
        } catch (error) {
            res.status(500).json({ message: 'Error course', error });
        }
      
    }

    //[POST] /create
    async create(req: Request, res: Response, next: NextFunction) {

        const formData = req.body;
        
        if(req.files){
            const files = req.files as { [key: string]: Express.Multer.File[] };
            if (files.image && files.image[0]) {
                formData.image = `/uploads/images/${files.image[0].filename}`;
            }
        }

        const course = new CourseModel(formData);
        try {
            await course.save();
            res.status(200).json({message: 'Create success!'});
        } catch (error) {
            res.status(500).json({ message: 'Error listing resources', error });
        }

    }

    //[PUT] /coures/:id
    async update(req:Request, res: Response, next: NextFunction) {
        try {
            const formData = req.body;
            
            if(req.files){
                const files = req.files as { [key: string]: Express.Multer.File[] };
                if (files.image && files.image[0]) {
                    formData.image = `/uploads/images/${files.image[0].filename}`;
                }
            }

           await CourseModel
            .updateOne({ _id: req.params.id }, formData)
            res.status(200).json({message: 'Update success!'});
        } catch (error) {
            res.status(500).json({ message: 'Error listing resources', error });
        }
        
    }

    //[DELETE] /coures/:id
    async forcedestroy(req:Request, res: Response, next: NextFunction) {
        try {
            await CourseModel
                .deleteOne({ _id: req.params.id })
             res.status(200).json({message: 'Delete success!'});
         } catch (error) {
             res.status(500).json({ message: 'Error listing resources', error });
         }
    }

 
}

export default new CourseApiController