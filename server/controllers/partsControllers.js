import Part from "../models/Part.js"
import stripe from "stripe"
import dotenv from "dotenv"

dotenv.config()

const stripekey = stripe(process.env.STRIPE_SECRET_KEY)

console.log("stripekey", stripekey)

export const readAll = async (req,res) => {
    try {

        const parts = await Part.find()

        res.json({
            msg: "bikes displayed",
            data: parts,
        })
    } catch(error) {
        console.log("error", error)
    }
}


export const create =async(req,res) => {

    const{model,brand, prices, availability,img,currency,id,description} = req.body

    console.log(req.body)
    //product on  stripe
    try {
        const product = await stripekey.products.create({
            model,
            brand,
            prices,
            availability,
            currency,
            id,
            image: [...img],
            
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
                nickname: priceOBJ.weight,

                metadata: {
                    weight: priceOBJ.weight,
                    priceDescription: priceOBJ.description
                }
            })
        })
    )

    console.log("stripePrices", stripePrices)

    const partsPrices = stripePrices.map((priceOBJ) =>{
        return{
            id: priceOBJ.id,
            weight: priceOBJ.metadata.weight,
            priceDescription: priceOBJ.metadta.priceDescription,
            price: priceOBJ.unit_amount
        }

    })

    const newPartsDB = await Part.create({
        idStripe: product.id,
        model: product.model,
        prices: partsPrices,
        img,
        currency,
        description: product.description,
        slug
    })


    return res.status(200).json({
        msg: "producto creado en stripe y  db",
        data: newPartsDB,
    })
    
    
} catch (error) {
    console.log("error", error)
}




    
}


export default {
readAll,
create,
}

