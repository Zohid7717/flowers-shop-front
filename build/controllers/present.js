import path from "path";
import Present from "../modules/Present.js";
import { uploadDir } from "../utils/Folders.js";
import fs from "fs/promises";
export const createPrecent = async (req, res) => {
    try {
        const doc = await req.body;
        const present_name = doc.present_name;
        const isUsed = await Present.findOne({ present_name });
        if (isUsed) {
            const imagePath = path.join(uploadDir, doc.present_imgUrl);
            await fs.unlink(imagePath);
            return res.status(403).json({ success: false, message: 'Подарок с таким названием уже существует' });
        }
        const newPresent = new Present({
            present_name: doc.present_name,
            present_price: doc.present_price,
            present_imgUrl: doc.present_imgUrl
        });
        await newPresent.save();
        return res.status(200).json({ success: true, newPresent, message: 'Подарок создан.' });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Что-то пошло не так. Повторите попытку.' });
    }
};
//# sourceMappingURL=present.js.map