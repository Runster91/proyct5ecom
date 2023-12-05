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


    res.status(200).json({
        msg: "Datos de Stripe recibidos.",
    })
}

export default{
    createCheckoutSession,
    createOrder
}