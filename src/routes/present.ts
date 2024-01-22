import { Router } from "express"
import { createPrecent } from "../controllers/present.js"

const router = Router()

//Создание букета
router.post('/createpresent', createPrecent)

export default router