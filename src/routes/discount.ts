import { Router } from "express"
import { createDiscount, getById, getDiscounts, updateDiscount } from '../controllers/discount.js'
import { checkAuth } from '../utils/checkAuth.js'

const router = Router()

//Создание скидок
router.post('/create', checkAuth, createDiscount)

//Получения скидок
router.get('/getAll', getDiscounts)

//Получения по id
router.get('/:id', checkAuth, getById)

//Обновления по id
router.put('/:id', checkAuth, updateDiscount)

export default router