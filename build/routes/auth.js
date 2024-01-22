import { Router } from 'express';
import { checkAuth } from '../utils/checkAuth.js';
import { register, login, getMe, updateUser } from '../controllers/auth.js';
const router = Router();
router.post('/register', register);
router.post('/login', login);
router.get('/getMe', checkAuth, getMe);
router.put('/update', checkAuth, updateUser);
export default router;
//# sourceMappingURL=auth.js.map