// 1. IMPORTACIÓN
import mongoose from "mongoose"

// 2. SCHEMA
const bikeSchema = mongoose.Schema({
  idStripe: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  prices: [
    {
      id: {
        type: String,
        required: true,
      },
      size: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      priceDescription: {
        type: String,
        required: true,
      },
    },
  ],
  img: {
    type: Array,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
})

// 3. MODELO
const Bike = mongoose.model("Bike", bikeSchema)

// 4. EXPORTACIÓN
export default Bike
