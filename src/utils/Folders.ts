import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import multer from "multer";

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export const uploadDir = path.join(__dirname, '../uploads')
export const bouquetStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir)
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname )
  }
})

export const uploadPresentDir = path.join(__dirname, '../presentImg')
export const presentStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPresentDir)
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})