import { Router } from "express";
import { uploadingPresentImg } from "../controllers/image.js";
const router = Router();
router.post('/uploadpresentimg', uploadingPresentImg);
export default router;
//# sourceMappingURL=image.js.map