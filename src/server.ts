import express from "express"
import mongoose, { ConnectOptions } from "mongoose"
import { config } from "dotenv";
import cors from "cors"
import authRoute from './routes/auth.js'
import discountRoute from './routes/discount.js'
import flowerRoute from "./routes/flower.js"
import bouquetRoute from "./routes/bouquet.js"
import presentRoute from "./routes/present.js"
import imageRoute from "./routes/image.js"
import path, { dirname } from 'path'
import { fileURLToPath } from "url";


const app = express()
config()
const PORT = process.env.PORT
const MONGO_URL = process.env.MONGO_URL

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, './uploads')))

app.use('/api/auth', authRoute)
app.use('/api/discount', discountRoute)
app.use('/api/flower', flowerRoute)
app.use('/api/bouquet', bouquetRoute)
app.use('/api/present', presentRoute)
app.use('/api/img', imageRoute)

async function start() {
  console.log(PORT)

  try {
    if (MONGO_URL) {
      const conn = await mongoose.connect(
        MONGO_URL, {
          useNewUrlParser: true,
        } as ConnectOptions)
      app.listen(PORT, () => {
        console.log(`Server started on port: ${PORT}`)
      })
      console.log(`MongoDB connected to: ${conn.connection.host}`)
    }
  } catch (error) {
    console.log(error)
  }
}

start()