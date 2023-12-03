import Bike from "../models/Bike.js"
import stripe from "stripe"
import dotenv from "dotenv"

dotenv.config()

const stripekey = stripe(process.env.STRIPE_SECRET_KEY)

// console.log("stripekey", stripekey)

export const readAll = async (req,res) => {
    try {

        const bikes = await Bike.find()

        res.json({
            msg: "bikes displayed",
            data: bikes,
        })
    } catch(error) {
        console.log("error", error)
    }
}

    export const create =async(req,res) => {

        const{model,brand, price, availability,image,currency,id} = req.body

        console.log(req.body)
        //product on  stripe
        try {
            const product = await stripekey.products.create({
                model,
                brand,
                price,
                availability,
                currency,
                id,
                images: [...img],
                
                metadata: {
                    productDescription: description,
                    slug
                }
            })

            console.log("product", product)
        

        //precio para el producto en  stripe 
        const stripePrices = await Promise.all(
            prices.map(async (priceOBJ) =>{
                return await stripe.prices.create({
                    currency,
                    product: product.id,
                    unit_amount: priceOBJ.price,
                    nickname: priceOBJ.weight
                })
            })
        )

        console.log("stripePrices", stripePrices)

        return res.status(200).json({
            msg: "producto creado en stripe",
            data: stripePrices,
        })

       
        
    } catch (error) {
        console.log("error", error)
    }



         //product on db
    //     try{
    //         const{model,brand, price, availability,image} = req.body
            
    //         const newBike = await Bike.create({
    //         model,
    //         brand,
    //         price,
    //         availability,
    //         currency,
    //         id,
    //         images   
    //         })

    //         return res.json({
    //             msg: "bike  added",
    //             data: newBike,
    //         })

    //    } catch (error){
    //     console.log ("error", error)
    //     res.status(500).json({
    //         msg:"Hubo un error obteniendo los datos"
    //     })
    //  }  
    }

  export default {
    readAll,
    create,
  }
  
