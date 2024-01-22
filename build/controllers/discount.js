import Discount from '../modules/Discount.js';
import User from '../modules/User.js';
export const createDiscount = async (req, res) => {
    try {
        const admin = await User.findById(req.userId);
        if (!(admin === null || admin === void 0 ? void 0 : admin.admin)) {
            return res.status(403).json({ message: 'Зайдите от имени администратора.' });
        }
        const { title, total, percent, status } = req.body;
        const isUsed = await Discount.findOne({ title });
        if (isUsed) {
            return res.status(403).json({ message: 'Скидка с таким названием существует!' });
        }
        const newDiscount = new Discount({
            title,
            total,
            percent,
            status
        });
        await newDiscount.save();
        res.status(200).json({ message: 'Данные успешно сохранены!' });
    }
    catch (error) {
        res.status(500).json({ message: 'Что-то пошло нетак. Попробуйте еще раз!' });
        console.log(error);
    }
};
export const getDiscounts = async (req, res) => {
    try {
        const discounts = await Discount.find().sort('total');
        if (!discounts) {
            return res.status(200).json({ message: 'Скидок не найдена.' });
        }
        res.status(200).json(discounts);
    }
    catch (error) {
        res.status(500).json({ message: 'Что-то пошло не так.' });
        console.log(error);
    }
};
export const getById = async (req, res) => {
    try {
        const admin = await User.findById(req.userId);
        if (!(admin === null || admin === void 0 ? void 0 : admin.admin)) {
            return res.status(403).json({ message: 'Зайдите от имени администратора.' });
        }
        const discount = await Discount.findById(req.params.id);
        res.status(200).json(discount);
    }
    catch (error) {
        res.status(500).json({ message: 'Что-то пошло не так.' });
        console.log(error);
    }
};
export const updateDiscount = async (req, res) => {
    try {
        const admin = await User.findById(req.userId);
        if (!(admin === null || admin === void 0 ? void 0 : admin.admin)) {
            return res.status(403).json({ message: 'Зайдите от имени администратора.' });
        }
        const discountId = req.params.id;
        await Discount.updateOne({ _id: discountId }, {
            title: req.body.title,
            total: req.body.total,
            percent: req.body.percent,
            status: req.body.status
        });
        res.status(200).json({ message: 'Данные успешно обновлены.' });
    }
    catch (error) {
        res.status(500).json({ message: 'Что-то пошло не так. Повторите попытку.' });
        console.log(error);
    }
};
//# sourceMappingURL=discount.js.map