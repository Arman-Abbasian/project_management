const { UserModel } = require("../../models/user.model");
const { compareHash } = require("../../modules/hashData");
const { tokenGenerator } = require("../../modules/token");

class AuthController{
   //methods 
   async login(req,res,next){
    try {
        const {username,password}=req.body;
        const existedUsername=await UserModel.findOne({username})
        if(!existedUsername) throw {status:401,message:"username or password is wrong"}
        const checkPassword=compareHash(password,existedUsername.password)
        if(!checkPassword) throw {status:401,message:"username or password is wrong"}
        const userToken=tokenGenerator({username})
        existedUsername.token=userToken;
        existedUsername.save();
        res.status(200).json({
            message:"enter successfully",
            userToken
        }) 
    } catch (error) {
        next(error)
    }
   }
   async profile(req,res,next){
    try {
        res.status(200).json({
            user:req.user
        })
    } catch (error) {
        next(error)
    }
}
}
module.exports={
    AuthController:new AuthController()
}