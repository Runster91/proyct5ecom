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

export default {
readAll,
create,
}

