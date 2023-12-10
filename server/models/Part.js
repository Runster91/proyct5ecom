// 1. IMPORTACIÓN
import mongoose from "mongoose"

// 2. SCHEMA

const partsSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  availability: {
    type: Boolean,
    default: true,
  },
})

// 3. MODELO
const Part = mongoose.model("Part", partsSchema)

// 4. EXPORTACIÓN
export default Part
