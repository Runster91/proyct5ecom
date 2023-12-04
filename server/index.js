// 1. IMPORTACIONES
// A. LIBRERÍAS
import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import swaggerUI from "swagger-ui-express"
import swaggerJSDoc from "swagger-jsdoc"
import path, { dirname } from "path"
import { fileURLToPath } from "url"
import connectDB from "./config/db.js"

// B. ARCHIVOS
import bikesRoute from "./routes/bikes.js"
import partsRoute from "./routes/parts.js"
import usersRoute from  "./routes/users.js"
import checkoutRoute from "./routes/checkout.js"

// 2. INICIALIZADORES
const app = express()
app.use(cors())
app.use(express.json())
dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const port = process.env.BASE_URL_PORT|| 3005

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Documentación sobre usuarios en Ucamp",
      version: "1.0.0",
    },
  },
  apis: [`${path.join(__dirname, "./routes/*.js")}`],
}

const swaggerDocs = swaggerJSDoc(swaggerOptions)
connectDB()
// 3. RUTAS

// A. APLICACIÓN
// PROD: https://midominio.com/
// DEV: localhost:3005/
app.use("/api/v1/users", usersRoute)
app.use("/api/v1/bikes", bikesRoute)
app.use("/api/v1/parts", partsRoute)
app.use("/api/v1/checkout", checkoutRoute)


// B. DOCUMENTACIÓN
app.use("/", swaggerUI.serve, swaggerUI.setup(swaggerDocs))

// 4. LEVANTAMIENTO DEL SERVIDOR
app.listen(port, () => console.log(`Servidor está activo y corriendo en el puerto ${port}`))
