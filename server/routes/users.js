// 1. IMPORTACIONES
// A. LIBRERÍAS
import express from "express"
// B. ARCHIVOS
import usersControllers from "./../controllers/usersControllers.js"

// 2. INICIALIZADORES
const router = express.Router()

// 3. CONTROLADORES

/**
 * @swagger
 * /api/v1/users:
 *  get:
 *      summary: Obtener todos los usuarios
 *      tags: [Usuarios]
 */

router.get("/", usersControllers.readAll)

router.post("/create", usersControllers.create)

// 4. EXPORTACIÓN
export default router