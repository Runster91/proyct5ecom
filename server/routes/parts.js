import express from "express"
import partsControllers from "../controllers/partsControllers.js"

const router = express.Router()

// OBTENER TODOS LOS CARROS
router.get("/", partsControllers.readAll)

router.post("/create", partsControllers.create)

export default router
