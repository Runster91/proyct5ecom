import User from "../models/User.js"

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
  
  export default {
    readAll,
  }