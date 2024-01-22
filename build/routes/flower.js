import { Router } from "express";
import { createFlower, getFlowers, removeFlower } from "../controllers/flower.js";
const router = Router();
router.post('/addflower', createFlower);
router.get('/getflowers', getFlowers);
router.delete('/deleteflower', removeFlower);
export default router;
//# sourceMappingURL=flower.js.map