
const multipleMongooseToObject = function(mongooses: any){
        return mongooses.map((mongoose: any) => mongoose.toObject());
}

const mongooseToObject = function(mongoose: any){
        return mongoose ? mongoose.toObject() : mongoose;
}

export { multipleMongooseToObject, mongooseToObject}
