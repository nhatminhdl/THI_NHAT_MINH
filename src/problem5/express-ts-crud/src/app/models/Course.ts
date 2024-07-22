import mongoose, { Document, Schema, SortOrder } from 'mongoose';
import {Request} from "express";

import { HydratedDocument, Model, QueryWithHelpers, model, connect } from 'mongoose';

interface ICourse extends Document {
  name: string;
  description: string;
  image: string;
  level: string;
  slug: string;
}

interface CourseQueryHelpers {
  sortable(req?: Request): QueryWithHelpers<
    HydratedDocument<ICourse>[],
    HydratedDocument<ICourse>,
    CourseQueryHelpers
  >
}

type ICourseModelType = Model<ICourse, CourseQueryHelpers>;

const CourseSchema = new Schema<
  ICourse,
  Model<ICourse, CourseQueryHelpers>,
  {},
  CourseQueryHelpers
>({
  name: { type: String, maxLength: 255, require: true },
  description: { type: String, maxLength: 600 },
  image: { type: String, maxLength: 255 },
  level: { type: String, maxLength: 255 },
},{
  timestamps: true,
});


CourseSchema.query.sortable = function byName(
  this: QueryWithHelpers<any, HydratedDocument<ICourse>, CourseQueryHelpers>,
  req: Request
) {
 
  if (req.query.hasOwnProperty("_sort")) {
    const column = req.query.column as string;
    const type = req.query.type as string ;

    const isValidtype = ["asc", "desc"].includes(type);
    const sortType : SortOrder= isValidtype ? type as SortOrder : "desc"
    const sortObject: { [key: string]: SortOrder } = {};
    sortObject[column] = sortType;
    
    return this.sort(sortObject);
}
return this;
};


// 2nd param to `model()` is the Model class to return.
const CourseModel = model<ICourse, ICourseModelType>('courses', CourseSchema);

export default CourseModel
