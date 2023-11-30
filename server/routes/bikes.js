import express from "express"
import bikesControllers from "./../controllers/bikesControllers.js"

const router = express.Router()

// OBTENER TODOS LOS CARROS
router.get("/", bikesControllers.readAll)

export default router
