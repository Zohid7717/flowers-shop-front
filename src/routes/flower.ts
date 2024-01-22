import { Router } from "express"
import { createFlower, getFlowers, removeFlower } from "../controllers/flower.js"

const router = Router()

//Добавить цветок
router.post('/addflower', createFlower)

//Получения списка цветов
router.get('/getflowers', getFlowers)

//Получения цветка
router.delete('/deleteflower', removeFlower)

export default router