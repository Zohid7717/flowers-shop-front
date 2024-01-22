import mongoose from "mongoose"

const PresentSchema = new mongoose.Schema(
  {
    present_name: {
      type: String,
      required: true
    },
    present_price: {
      type: Number,
      required: true
    },
    present_imgUrl: {
      type: String,
      required: true
    }
  },
  {timestamps: true}
)

export default mongoose.model('Present', PresentSchema)