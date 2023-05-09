const { UserModel } = require("../../models/user.model");
const { compareHash } = require("../../modules/hashData");

class AuthController{
   //methods 
   async login(req,res,next){
    try {
        const {username,password}=req.body;
        const existedUsername=await UserModel.findOne({username})
        if(!existedUsername) throw {status:401,message:"username or password is wrong"}
        const checkPassword=compareHash(password,existedUsername.password)
        if(!checkPassword) throw {status:401,message:"username or password is wrong"}
        res.status(200).json({
            message:"enter successfully"
        }) 
    } catch (error) {
        next(error)
    }
   }
}
module.exports={
    AuthController:new AuthController()
}