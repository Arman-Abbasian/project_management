const { verify } = require("jsonwebtoken");
const { verifyToken } = require("../../modules/token");
const { UserModel } = require("../../models/user.model");

async function checkUserToken(req,res,next){
    const authError={status:400,message:"please enter your account"}
try {
    const authorization=req?.headers?.authorization;
    if(!authorization) throw authError;
    const [bearer,token]=authorization.split(" ");
    if(!bearer || bearer.toLowerCase()!=="bearer") throw authError
    if(!token) throw authError;
    const username=verifyToken(token)
    const user=await UserModel.findOne({username},{password:0});
    if(!user) throw authError
    req.user=user;
    next()
} catch (error) {
    next(error)
}
}
module.exports={checkUserToken}