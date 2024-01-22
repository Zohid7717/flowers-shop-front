import { Router } from 'express';
import { checkAuth } from '../utils/checkAuth.js';
import { register, login, getMe, updateUser } from '../controllers/auth.js';

const router = Router()

//Регистрация
router.post('/register', register)

//Авторизация
router.post('/login', login)

//Получения логин
router.get('/getMe', checkAuth, getMe)

//Обновления данных
router.put('/update', checkAuth, updateUser)

export default router