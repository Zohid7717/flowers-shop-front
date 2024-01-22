import User from '../modules/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
export const register = async (req, res) => {
    try {
        const { username, nickname, password, adminpass, tel, ccn } = req.body;
        const adminpassword = process.env.ADMIN_PASSWORD;
        let adminValue = false;
        if (adminpass === adminpassword) {
            adminValue = true;
        }
        const isUsed = await User.findOne({ nickname });
        if (isUsed) {
            return res.status(403).json({ message: 'Пользователь таким nickname уже существует.' });
        }
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const newUser = new User({
            username,
            nickname,
            password: hash,
            admin: adminValue,
            tel,
            ccn
        });
        const secret = process.env.JWT_SECRET || "secret";
        const token = jwt.sign({ id: newUser._id }, secret, { expiresIn: '30d' });
        await newUser.save();
        res.status(200).json({ newUser, token, message: 'Регистрация прошла успешно.' });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Что-то пошло не так. Просим попробовать позже.' });
    }
};
export const login = async (req, res) => {
    try {
        const { nickname, password } = req.body;
        const user = await User.findOne({ nickname });
        if (!user) {
            return res.status(403).json({ message: 'Ошибка при авторизации.' });
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(403).json({ message: 'Ошибка при авторизации.' });
        }
        const secret = process.env.JWT_SECRET || 'secret';
        const token = jwt.sign({ id: user._id }, secret, { expiresIn: '30d' });
        res.status(200).json({ token, user, message: 'Вы успешно авторизованы.' });
    }
    catch (error) {
        res.status(500).json({ message: 'Ошибка приавторизации. Попробуйте позже.' });
        console.log(error);
    }
};
export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(403).json({ message: 'Ошибка при авторизации.' });
        }
        const secret = process.env.JWT_SECRET || 'secret';
        const token = jwt.sign({ id: user._id }, secret, { expiresIn: '30d' });
        res.status(200).json({ user, token, message: 'Вы успешно авторизованы.' });
    }
    catch (error) {
        res.status(500).json({ message: 'Ошибка при авторизации' });
        console.log(error);
    }
};
export const updateUser = async (req, res) => {
    try {
        const { username, nickname, tel, ccn } = req.body;
        const userId = req.userId;
        const user = await User.findById(userId);
        if (user) {
            const isUsed = await User.findOne({ nickname });
            if (isUsed && !isUsed._id.equals(user._id)) {
                return res.status(403).json({ message: `Пользователь с nickname ${nickname} уже существует.` });
            }
            else {
                user.username = username;
                user.nickname = nickname;
                user.tel = tel;
                user.ccn = ccn;
                await user.save();
                return res.status(200).json({ user, message: 'Данные успешно обновлены.' });
            }
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Ошибка при обновлении данных' });
        console.log(error);
    }
};
//# sourceMappingURL=auth.js.map