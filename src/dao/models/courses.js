import mongoose from "mongoose";


const coursesCollection = 'Courses';

const coursesSchema = mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    description: String,
    teacher: {
        type: String,
        require: true,
    },
    students: {
        type: Array,
        default: []
    }
})

export const coursesModel = mongoose.model(coursesCollection, coursesSchema);