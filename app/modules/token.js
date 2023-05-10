const jwt=require("jsonwebtoken")
function tokenGenerator(payload){
const token=jwt.sign(payload,process.env.SECRET_KEY,{expiresIn:"365 days"})
return token
}
function verifyToken(token){
    const result=jwt.verify(token,process.env.SECRET_KEY)
    if(!result) throw {status:400,message:"please enter your account"}
    if(!result.username) throw {status:400,message:"please enter your account"}
    return result.username
    }
module.exports={
    tokenGenerator,
    verifyToken
}
