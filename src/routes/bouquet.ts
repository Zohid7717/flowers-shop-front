import { Router } from "express"
import { createBouquet, getBouquet, getBouquets } from "../controllers/bouquet.js"

const router = Router()

//Добавить букет
router.post('/addbouquet', createBouquet)

//Получить букет
router.get('/getbouquet/:id', getBouquet)

//Получить букеты
router.get('/bouquets', getBouquets)

export default router