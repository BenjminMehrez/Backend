import { courseModel } from "../models/courses.js";

export default class CoursesManager{


    async getCourses(){
        try{
       const coursesdb= await courseModel.find({})
       return coursesdb
        }
        catch(err){
        return err
        }
    }

    async addCourses(obj){
        try{
       const coursenew= await courseModel.create(obj)
       return coursenew
        }
        catch(err){
        return err
        }
    }
}