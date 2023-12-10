import jwt from "jsonwebtoken"

const decrypt = async(req, res, next) => {

    const token = req.header("x-auth-token")
    console.log("token" , token)

    if(!token){
        return res.status(401).json({
            msg: "No hay token o es  invalido, intente de en otro momento"
        })
    }

    try{

        console.log("token", token)
        console.log("secret", process.env.JWT_SECRET)


        const openToken = await jwt.verify(token, process.env.JWT_SECRET)
        console.log("openToken", openToken),


        req.user = openToken.user,

        next()
    } catch (error) {
        res.status(500).json({
            msg: "Hubo un error en servidor o token",
        })
    }

}

export default decrypt