import User from "../models/User.js"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

export const readAll = async (req,res) => {
    try {

        const users = await User.find()

        res.json({
            msg: "bikes displayed",
            data: users,
        })
    } catch(error) {
        console.log("error", error)
    }
}
  



export const create =async(req,res) => {
    try{
        const{name, email, phone, password} = req.body
        
        const salt = await bcryptjs.genSalt(10)

        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser = await User.create({
        name,
        email,
        phone,
        password : hashedPassword, 
        })

        const payload = {
            user: {
                id: newUser_id,
            }
        }

        jwt.sign (
            payload,
            process.env.JWT_SECRET,
            {
                expiresin: 360000
            }, (error, token) => {
                if (error){
                    console.log("error", error)
                    return new Error(error)
                }
                return res.json({
                    msg: "user  added in cure manner",
                    data: token,
                })
        


            }
        )

        

   } catch (error) {
    console.log ("error", error)
    res.status(500).json({
        msg:"Hubo un error obteniendo los datos"
    })
 }  
}

const login = async(req, res) => {

    const {name, password } = req.body

    try{
        const foundUser = await User.findOne({ email })
        console.log("foundUser", foundUser)

        if(!foundUser){
            return res.status(400).json({
                msg: "El usuario o la contraseña no coinciden. Codigo: 5841"
            })
        }

            const dbUserPassword = foundUser.password

            const verifiedPass = await bcryptjs.compare(password, dbUserPassword)

            if(!verified) {
                return await res.status.json({
                    msg: "El usuario o la contraseña no coinciden.Código  5845",
                })
            const payload = {
                user: {
                    id: foundUser._id,
                },
            }  
            
            jwt.sign(
                payload,
                process.env.JWT_SECRET,
                {
                    expiresin:360000
                },
                (err, token) => {
                    if (error) {
                        console.log("error", error)
                        return new Error(error)
                    }

                    return res.json({
                        msg: "Usuario con inicio de sesión exitoso",
                        data: token,
                    })
                }
            )
            
            }


    } catch (error){
        console.log("error", error)
        res.status(500).json({
            msg: "Hubo un problema de conexión",
    })        
}
}

const verifyToken = async(req, res) => {
    try {
        console.log("req.user", req.user)
    const  foundUser = await User.findById(req.user.id)
    console.log ("foundUser", foundUser)


    return res.json({
        msg: "Datos de usuario encontrados",
        data: foundUser
    })
  } catch (error) {
     console.log(error)
     res.status(500).json({
        msg: "el usuario no se  encontro "
     })
    }
}

export default {
readAll,
create,
login,
verifyToken,
}

