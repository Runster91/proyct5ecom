import express from "express"
import checkoutController from "../controllers/checkoutController.js"
import bodyParser from "body-parser"

const router = express.Router()

router.get("/create-checkout-session", checkoutController.createCheckoutSession)
router.post("/create-order",
 bodyParser.raw({type: "application/json"}), 
checkoutController.createOrder);

export default router
