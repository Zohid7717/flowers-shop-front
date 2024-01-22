import { Router } from "express";
import { createPrecent } from "../controllers/present.js";
const router = Router();
router.post('/createpresent', createPrecent);
export default router;
//# sourceMappingURL=present.js.map