import Part from "../models/Part.js"

export const readAll = async (req,res) => {
    try {

        const parts = await Part.find()

        res.json({
            msg: "bikes displayed",
            data: parts,
        })
    } catch(error) {
        console.log("error", error)
    }
}
  
export const create =async(req,res) => {
    try{
        const{model,brand, price, availability} = req.body
        
        const newPart = await Part.create({
         model,
         brand,
         price,
         availability   
        })

        return res.json({
            msg: "part  added",
            data: newPart,
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

