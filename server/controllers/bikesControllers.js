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
  
  export default {
    readAll,
  }
  
