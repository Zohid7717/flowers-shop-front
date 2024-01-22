import mongoose from "mongoose";
const FlowerSchema = new mongoose.Schema({
    flower_name: {
        type: String,
        required: true
    }
}, { timestamps: true });
export default mongoose.model('Flower', FlowerSchema);
//# sourceMappingURL=Flower.js.map