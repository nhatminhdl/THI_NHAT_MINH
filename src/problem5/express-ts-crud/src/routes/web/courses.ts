import express from "express"
import CourseController from "../../app/controllers/web/CourseController";

const routes = express.Router();
routes.get('/',CourseController.show)
routes.delete('/deleteAll', CourseController.forcedestroyAll)
routes.post('/create',CourseController.create)
routes.put('/:id',CourseController.update)
routes.delete('/:id',CourseController.forcedestroy)

export default routes;