import jwt from 'jsonwebtoken';
export const checkAuth = (req, res, next) => {
    var _a;
    const token = (_a = req.header('authorization')) === null || _a === void 0 ? void 0 : _a.replace(/Bearer\s?/, '');
    if (token) {
        try {
            const secret = process.env.JWT_SECRET || 'secret';
            const decoded = jwt.verify(token, secret);
            req.userId = decoded.id;
            next();
        }
        catch (error) {
            return res.status(403).json({ message: 'Достеп не разрешен.' });
        }
    }
    else {
        return res.status(403).json({ message: 'Вы не авторизованы.' });
    }
};
//# sourceMappingURL=checkAuth.js.map