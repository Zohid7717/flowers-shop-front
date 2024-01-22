import { Router } from "express"
import { uploadImgs, uploadImg } from "../controllers/image.js"
import multer, { Multer } from "multer"
import { bouquetStorage } from "../utils/Folders.js";
const router = Router()

const uploadBouquet: Multer = multer({ storage: bouquetStorage })

// добавить изображения в базу presents 
router.post('/uploadimg', uploadImg)

//добавить изображения в базу bouquets
router.post('/uploadimgs', uploadBouquet.array('images'), uploadImgs)

export default router