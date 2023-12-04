import express from "express"
import checkoutController from "../controllers/checkoutController.js"

const router = express.Router()

router.get("/create-checkout-session", checkoutController.createCheckoutSession)

export default router
