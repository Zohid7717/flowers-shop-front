import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import multer from "multer";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export const uploadDir = path.join(__dirname, 'uploads');
export const bouquetStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-bouquet-' + uniqueSuffix + path.extname(file.originalname));
    }
});
export const uploadPresentDir = path.join(__dirname, 'presentImg');
export const presentStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadPresentDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-present-' + uniqueSuffix + path.extname(file.originalname));
    }
});
//# sourceMappingURL=Folders.js.map