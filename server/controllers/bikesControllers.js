export const readAll = (req,res) => {
    try {
        res.json({
            msg: "bikes displayed"
        })
    } catch(error) {
        console.log("error", error)
    }
}
  
  export default {
    readAll,
  }
  
