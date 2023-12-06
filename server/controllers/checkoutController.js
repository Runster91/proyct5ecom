import Cart from "../models/Cart.js";
import stripe from "stripe";
import dotenv from "dotenv";

dotenv.config()

const stripekey = stripe(process.env.STRIPE_SECRET_KEY)

const createCheckoutSession = async(req, res) =>{
    const user = {
        id: "123",
        email: "example@runster91.com"
    }

const line_items= [
    {
        price: "price_1OJ9VsJ1UyaBsovqMVgHWa9v",
        quantity: 1
    }
]
try {
    const session = await stripekey.checkout.sessions.create({
        line_items,
        mode: "payments",
        succes_url: "https://buy.stripe.com/test_6oE5lyct46U9eDm9AB",
        cancel_url: "https://google.com",
        customer_email: "example@runster91.com",
    })

    console.log("session", session)

    res.status(200).json({
        msg:"Accede a esta liga para pagar",
        session_url: session.url,
        session
    })
} catch (error) {
    console.log("error", error)
    res.status(400).json({
        msg: "Hubo un problema",
        error,
    })
}

}

const createOrder = async (req,res) =>{
    // const sig = req.headers["stripe-signature"]
    // const endpointSecret = process.env.STRIPE_WH_SIGNIN_SE
    // console.log(req.body)
    // console.log(sig)
    // console.log(endpointSecret)
    
    // let event
    // try {
    //     event =stripekey.webhooks.constructEvent(req.body, sig, endpointSecret)
    // } catch (error) {
    //     console.log("error", error)
    //     res.status(400).json({
    //         msg: error
    //     })
    // }
    const paymentIntent = req.body.session.data.object
    const email = paymentIntent.recipt_url
    const receiptID = receiptURL.split("/").filter((item) => item).pop
    const amount = paymentIntent.amount
    const date_created = paymentIntent.created

    const paymentDB = User.findOneAndUpdate({email}, 
        {
            $push: {
                receipts:{
                    receiptURL,
                    receiptID,
                    date_created,
                    amount,
                },
            },
        }, 

        {new: true}
        )

    console.log ("req.body", req.body)
    console.log("req.body", req.body.session)
    try {
        switch(true){
            case "charge.succeeded":
                default: 
                console.log("Evento no encontrado")

                res.status(200).json({
                    msg: "evento no encontrado",
                })

               

        }
    } catch (error) {
        console.log ("error", error)
        res.status(400).json({
            msg:error,
        })
    }

    res.status(200).json({
        msg: "Datos de Stripe recibidos.",
    })
}

export default{
    createCheckoutSession,
    createOrder
}