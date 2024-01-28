import { Router } from "express"
import { createCourse, getAllCourse, updateCourse } from '../controllers/course.js'

const router = Router()

//Добавить курс
router.post('/addcourse', createCourse)

//Получить курс
router.get('/getcourse', getAllCourse)

//Обновления курса
router.put('/updatecourse', updateCourse)

export default router