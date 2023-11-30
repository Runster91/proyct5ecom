import User from "../models/User.js"
import bcryptjs from "bcryptjs"

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

        return res.json({
            msg: "user  added",
            data: newUser,
        })

   } catch (error){
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

