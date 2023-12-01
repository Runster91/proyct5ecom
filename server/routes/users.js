// 1. IMPORTACIONES
// A. LIBRERÍAS
import express from "express"
import jwt from "jsonwebtoken"
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

router.post("/login", usersControllers.login)

router.get(
    "/verifytoken", 
    async(req, res, next) => {

    const token = req.header("x-auth-token")
    console.log("token" , token)

    if(!token){
        return res.status(401).json({
            msg: "No hay token o es  invalido, intente de en otro momento"
        })
    }

    try{

        console.log("token", token)
        console.log("secret", process.env.JWT_SECRET)


        const openToken = await jwt.verify(token, process.env.JWT_SECRET)
        console.log("openToken", openToken),


        req.user = openToken.user,

        next()
    } catch (error) {
        res.status(500).json({
            msg: "Hubo un error en servidor o token",
        })
    }

}, 
usersControllers.verifyToken
) 



// 4. EXPORTACIÓN
export default router