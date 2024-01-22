import { Router } from "express";
import { createDiscount, getById, getDiscounts, updateDiscount } from '../controllers/discount.js';
import { checkAuth } from '../utils/checkAuth.js';
const router = Router();
router.post('/create', checkAuth, createDiscount);
router.get('/getAll', getDiscounts);
router.get('/:id', checkAuth, getById);
router.put('/:id', checkAuth, updateDiscount);
export default router;
//# sourceMappingURL=discount.js.map