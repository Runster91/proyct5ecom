import express from "express"
import partsControllers from "./../controllers/partsControlles.js"

const router = express.Router()

// OBTENER TODOS LOS CARROS
router.get("/", partsControllers.readAll)

export default router
