import multer from 'multer';
import { bouquetStorage, presentStorage } from '../utils/Folders.js';
const uploadBouquet = multer({ storage: bouquetStorage });
const uploadPresent = multer({ storage: presentStorage });
export const uploadingPresentImg = async (req, res, next) => {
    try {
        uploadPresent.single('image')(req, res, next);
        const uploadFile = req.file;
        if (!uploadFile) {
            return res.status(400).json({ success: false, message: 'Изображения не загружена.' });
        }
        const imageUrl = uploadFile.filename;
        res.status(200).json({ success: true, imageUrl });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Произошло ошибка при обработке данных' });
    }
};
//# sourceMappingURL=image.js.map