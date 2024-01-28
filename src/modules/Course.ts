import { timeStamp } from 'console'
import mongoose from "mongoose"

const CourseSchema = new mongoose.Schema(
  {
    name: String,
    course: {
      type: Number,
      default: 0
    } 
  },
  {timestamps: true}
)

export default mongoose.model('Course', CourseSchema)