import mongoose from 'mongoose'

const DiscountSchema = new mongoose.Schema(
  {
    title: {
      type: 'String',
      require: true,
    },
    total: {
      type: 'Number',
      require: true
    },
    percent:{
    type: 'Number',
    require: true
    },
    status: {
      type: Boolean,
      require: true
    }
  },
  {timestamps: true}
)

export default mongoose.model('Discount', DiscountSchema)