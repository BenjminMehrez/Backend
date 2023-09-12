import { Router } from "express";
import CursosManagers from "../dao/files/courses.js"


const router = Router()
const cmanager = new CursosManagers()

router.get("/", async (req, res) => {
    const cursos = await cmanager.getCourses()
    if (cursos.lenght === 0) {
        res.json("Curso no creado")

    }
    else {
        res.json("Curso creado")
    }
})


export default router