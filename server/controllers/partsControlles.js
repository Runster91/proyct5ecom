export const readAll = (req,res) => {
    try {
        res.json({
            msg: "parts displayed"
        })
    } catch(error) {
        console.log("error", error)
    }
}
  
  export default {
    readAll,
  }