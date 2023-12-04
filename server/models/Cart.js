import mongoose from "mongoose";

const cartSchema = mongoose.Schema({
    products: [{
        quantity:{
           type: Number,
           required: true,           
        },
        priceID:{
            type:String,
            required: true
        },
        weight: {
            type:Number,
            required: true
        },
        model:{
            type:String,
            required: true
        },
        priceDescription:{
            type: String,
            required: true
        },
        price:{
            type:Number,
            required:true
        },
        img:{
            type:Array,
            required:true
        },
        slug:{
            type: String,
            required:true
        }
    }]
})

const Cart =mongoose.model("Cart", cartSchema)

export default Cart