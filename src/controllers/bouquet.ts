import path from 'path'
import Bouquet from "../modules/Bouquet.js"
import { RequestHandler } from "express"
import fs from "fs/promises"
import { uploadDir } from '../utils/Folders.js'

// Create bouquet
export const createBouquet: RequestHandler = async (req, res) => {
  try {
    const doc = await req.body.dataToString
    const docToArr = await JSON.parse(doc)
    const name = docToArr.name
    const isUsed = await Bouquet.findOne({ name })
    if (isUsed) {
      for (const imageName of docToArr.bouquetImg) {
        const imagePath = path.join(uploadDir, imageName)
        await fs.unlink(imagePath)
      }
      return res.status(403).json({ success: false, message: 'Букет с таким название уже существует.' })
    }
    const newBouquet = new Bouquet({
      _id: docToArr._id,
      name: docToArr.name,
      category: docToArr.category,
      composition: docToArr.composition,
      size: docToArr.size,
      bouquetImg: docToArr.bouquetImg
    })
    await newBouquet.save()
    res.status(200).json({ success: true, message: 'Букет создан.' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Что-то пошло не так. Просим повторить попытку.' })
  }
}

//get Bouquet
export const getBouquet: RequestHandler = async (req, res) => {
  try {
    const bouquetId = req.params.id
    const bouquet = await Bouquet.findById(bouquetId)
    if (!bouquet) {
      return res.status(400).json({ success: false, message: 'Букет не найден.' })
    }
    res.status(200).json({ success: true, bouquet })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Что-то пошло не так, попробуйте еще раз!' })
  }
}

// get Bouquets by params
export const getBouquetsByParams: RequestHandler = async (req, res) => {
  try {
    const filterParams = req.body

  } catch (error) {

  }
}

// get All bouquets
export const getBouquets: RequestHandler = async (req, res) => {
  try {
    const bouquets = await Bouquet.find()
    if (!bouquets) {
      return res.status(400).json({ success: false, message: 'Букетов не найдено!' })
    }
    const sentInfo = bouquets.map(bouquet => {
      const selectedSize = bouquet.size.find(size=>size.size_use)
      return {
        id: bouquet._id,
        name: bouquet.name,
        price: selectedSize ? selectedSize.size_price : null,
        discount_price: selectedSize?.discount_price ? selectedSize.discount_price : null,
        image: bouquet.bouquetImg[0]
      }
    })
    res.status(200).json({ success: true, sentInfo })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Ошибка при обработке данных!' })
  }
}