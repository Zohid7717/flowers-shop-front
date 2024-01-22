import mongoose from 'mongoose';
const BouquetSchema = new mongoose.Schema({
    _id: String,
    name: {
        type: String,
        required: true,
        unique: true
    },
    category: {
        type: String,
        required: true
    },
    composition: {
        type: Array,
        default: []
    },
    size: [{
            size_name: String,
            size_price: Number,
            discount_price: Number,
            size_use: Boolean
        }],
    count: {
        type: Number,
        default: 0
    },
    status: String,
    bouquetImg: [
        {
            type: String
        }
    ],
}, { timestamps: true });
export default mongoose.model('Bouquet', BouquetSchema);
//# sourceMappingURL=Bouquet.js.map