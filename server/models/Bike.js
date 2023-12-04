import mongoose from "mongoose";

const bikeSchema = mongoose.Schema({
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
        requied: true
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
        requied: true
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

const Bike = mongoose.model("Bike", bikeSchema)

export default Bike