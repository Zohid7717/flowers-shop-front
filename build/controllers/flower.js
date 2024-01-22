import Flower from '../modules/Flower.js';
import Bouquet from "../modules/Bouquet.js";
export const createFlower = async (req, res) => {
    try {
        const { flower_name } = req.body;
        const isUsed = await Flower.findOne({ flower_name });
        if (isUsed) {
            return res.status(403).json({ message: 'Цветор с таким названием уже существует.' });
        }
        const newFlower = new Flower({
            flower_name
        });
        await newFlower.save();
        const flowers = await Flower.find().sort('flower_name');
        res.status(200).json({ flowers, message: 'Цветок добавлен.' });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Ошибка при добавлении.' });
    }
};
export const getFlowers = async (req, res) => {
    try {
        const flowers = await Flower.find().sort('flower_name');
        if (!flowers) {
            return res.status(200).json({ message: 'Цветы не обнаружены.' });
        }
        res.status(200).json(flowers);
    }
    catch (error) {
        res.status(500).json({ message: 'Что-то пошло не так. Повторите попытку.' });
        console.log(error);
    }
};
export const removeFlower = async (req, res) => {
    try {
        const { flower_id } = req.body;
        const BouquetsContainingFlower = await Bouquet.find({ flower_id });
        if (BouquetsContainingFlower) {
            for (const bouquet of BouquetsContainingFlower) {
                await Bouquet.findByIdAndDelete(bouquet._id);
            }
        }
        await Flower.findByIdAndDelete(flower_id);
        const flowers = await Flower.find();
        res.status(200).json({ flowers, message: 'Элемент был удален.' });
    }
    catch (error) {
        res.status(500).json({ message: 'Что-то пошло не так. Повторите попытку.' });
        console.log(error);
    }
};
//# sourceMappingURL=flower.js.map