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
  
  export default {
    readAll,
  }
  