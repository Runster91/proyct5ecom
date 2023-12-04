import mongoose from "mongoose";

const partSchema = mongoose.Schema({
    idStripe:{
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    brand:{
        type: String,
        required: true
    },
    prices: [
        {
            id: {
                type: String,
                required: true
            },
            weight: {
                type: Number,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            priceDescription: {
                type: String,
                required: true
            }
        }
    ],
    currency: {
        type: String,
        required: true
    },
    
    img: {
        type: Array,
        required: true
    },
    Availability: {
        type: Boolean,
        default: true
    },
    description: {
        type: String,
        required:true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
})

const Part = mongoose.model("Part", partSchema)

export default Part