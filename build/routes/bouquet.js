import { Router } from "express";
import { createBouquet, getBouquet } from "../controllers/bouquet.js";
const router = Router();
router.post('/addbouquet', createBouquet);
router.get('/getbouquet/:id', getBouquet);
export default router;
//# sourceMappingURL=bouquet.js.map