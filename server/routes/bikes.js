import express from "express"
import bikesControllers from "./../controllers/bikesControllers.js"

const router = express.Router()

// OBTENER TODOS LOS CARROS
router.get("/", bikesControllers.readAll)

router.post("/create", bikesControllers.create)

router.get("/readone/:id",bikesControllers.readOne)

router.put("/update/:id", bikesControllers.edit)

router.delete("/deleteone/:id",bikesControllers.deleteOne)

export default router
