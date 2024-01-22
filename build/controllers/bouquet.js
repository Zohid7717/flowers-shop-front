import path from 'path';
import Bouquet from "../modules/Bouquet.js";
import fs from "fs/promises";
import { uploadDir } from '../utils/Folders.js';
export const createBouquet = async (req, res) => {
    try {
        const doc = await req.body.dataToString;
        const docToArr = await JSON.parse(doc);
        const name = docToArr.name;
        const isUsed = await Bouquet.findOne({ name });
        if (isUsed) {
            for (const imageName of docToArr.bouquetImg) {
                const imagePath = path.join(uploadDir, imageName);
                await fs.unlink(imagePath);
            }
            return res.status(403).json({ success: false, message: 'Букет с таким название уже существует.' });
        }
        const newBouquet = new Bouquet({
            _id: docToArr._id,
            name: docToArr.name,
            category: docToArr.category,
            composition: docToArr.composition,
            size: docToArr.size,
            bouquetImg: docToArr.bouquetImg
        });
        await newBouquet.save();
        res.status(200).json({ success: true, message: 'Букет создан.' });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Что-то пошло не так. Просим повторить попытку.' });
    }
};
export const getBouquet = async (req, res) => {
    try {
        const bouquetId = req.params.id;
        const bouquet = await Bouquet.findById(bouquetId);
        if (!bouquet) {
            return res.status(400).json({ success: false, message: 'Букет не найден.' });
        }
        res.status(200).json({ success: true, bouquet });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Что-то пошло не так, попробуйте еще раз!' });
    }
};
//# sourceMappingURL=bouquet.js.map