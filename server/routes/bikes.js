import express from "express"
import bikesControllers from "./../controllers/bikesControllers.js"

const router = express.Router()

// OBTENER TODOS LOS CARROS
router.get("/", bikesControllers.readAll)

router.post("/create", bikesControllers.create)

export default router
