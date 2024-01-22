
import express, { Request, Response, NextFunction } from "express"
import multer, { Multer } from 'multer'
import fs from "fs/promises"
import { bouquetStorage, presentStorage, uploadDir } from '../utils/Folders.js'
import path from 'path'


const uploadPresent: Multer = multer({ storage: presentStorage })

export const uploadImgs = async (req: Request, res: Response) => {
  try {
    const uploadedFiles = req.files as Express.Multer.File[] | undefined
    if (!uploadedFiles) {
      return res.status(400).json({ error: 'Файл не загружен!' })
    }
    const imagesUrls = uploadedFiles.map(file => `${file.filename}`)
    res.status(200).json({success: true, images: imagesUrls})
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Произошло ошибка при обработке данных' })
  }
}
// app.post('/api/uploadBouquet', uploadBouquet.array('images'), (req: express.Request, res: express.Response) => {
//   try {
//     const uploadedFiles = req.files as Express.Multer.File[] | undefined
//     if (!uploadedFiles) {
//       return res.status(400).json({ error: 'файл не загружен' })
//     }
//     const imagesUrls = uploadedFiles.map(file => (
//       `/${file.filename}`
//     ))
//     res.json({ success: true, images: imagesUrls })
//   } catch (error) {
//     console.log(error)
//     res.status(500).json({ error: 'Internal Server Error' })
//   }
// })

// app.delete('/api/uploadBouquet', async (req: express.Request, res: express.Response) => {
//   try {
//     const imagesToDelete = req.body
//     if (!imagesToDelete || !Array.isArray(imagesToDelete)) {
//       return res.status(400).json({ error: 'Некорректные данные для удаления.' })
//     }
//     for (const imageName of imagesToDelete) {
//       const cleanedImagePath = imageName.replace('/uploads', '')
//       const imagePath = path.join(uploadDir, cleanedImagePath)
//       await fs.unlink(imagePath)
//     }
//     res.json({ message: 'Изображения успешно удалено' })
//   } catch (error) {
//     console.log(error)
//     res.status(500).json({ message: 'Internal Server Error' })
//   }
// })

export const uploadImg = async (req: Request, res: Response, next: NextFunction) => {
  try {
    uploadPresent.single('image')(req, res, next)
    const uploadFile = req.file as Express.Multer.File | undefined
    if (!uploadFile) {
      return res.status(400).json({ success: false, message: 'Изображения не загружена.' })
    }
    const imageUrl = uploadFile.filename
    res.status(200).json({ success: true, imageUrl })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Произошло ошибка при обработке данных' })
  }
}
// app.post('/api/uploadPresent', uploadPresent.single('image'), (req: Request, res: Response) => {
//   try {
//     const uploadedFile = req.file as Express.Multer.File | undefined
//     if (!uploadedFile) {
//       return res.status(400).json({error: 'Файл не загружен'})
//     }
//     const imageUrl = uploadedFile.filename
//     res.json({success: true, imageUrl })
//   } catch (error) {
//     console.log(error)
//     res.status(500).json({error: 'Ошибка при обработке данных.'})
//   }
// })