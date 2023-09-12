import { coursesModel } from "../models/courses.js";
import { usersModel } from "../models/users.js";

export default class CoursesManager{
    constructor() {

    }
    getAll = async () => {
        const courses = await coursesModel.find();
        return courses.map(cours => cours.toObject());
    }

    saveCourses = async (cours) => {
        try {
            const result = await coursesModel.create(cours);
            return result;
        } catch (error) {
            throw error;
        }
    }

    addUserToCourses = async (idCourses, idUser) => {
        try {
            const user = await usersModel.findOne({ _id: idUser })
            const courses = await coursesModel.findOne({ _id: idCourses })

            courses.students.push({
                first_name: user.first_name,
                last_name: user.last_name
            });
            user.courses.push(courses.title)

            await usersModel.updateOne({ _id: idUser }, user)
            await coursesModel.updateOne({ _id: idCourses }, courses)
            return;
        } catch (error) {
            throw error;
        }
    }
}