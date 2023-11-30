import Bike from "../models/Bike.js"

export const readAll = async (req,res) => {
    try {

        const bikes = await Bike.find()

        res.json({
            msg: "bikes displayed",
            data: bikes,
        })
    } catch(error) {
        console.log("error", error)
    }
}

    export const create =async(req,res) => {
        try{
            const{model,brand, price, availability} = req.body
            
            const newBike = await Bike.create({
             model,
             brand,
             price,
             availability   
            })

            return res.json({
                msg: "bike  added",
                data: newBike,
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
  
