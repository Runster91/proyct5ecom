import mongoose from "mongoose";

const bikeSchema = mongoose.Schema({
    model: {
        type: String,
        required: true
    },
    brand:{
        type: String,
        requied: true
    },
    price: {
        type: Number,
        requied: true
    },
    image: {
        type: String,
        required: false
    },
    Availability: {
        type: Boolean,
        default: true
    }
})

const Bike = mongoose.model("Bike", bikeSchema)

export default Bike