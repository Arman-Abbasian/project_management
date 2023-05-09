const { TeamtModel } = require("../../models/team.model");
const { UserModel } = require("../../models/user.model")

class UserController{
    //methods 
    async register(req,res,next){
        try {
        const {first_name,last_name,username,password,email,mobile,skills,roles,teams}=req.body;
        //check if the username is existed ago or not
        let user= await UserModel.findOne({username:value});
        if (user) throw {staus:401,message:"username is existed please choose another username"} ;
         //check if the email is existed ago or not
         user=await UserModel.findOne({email});
        if(user) throw {staus:401,message:"this email is registered forago"};
         //check if the mobile is existed ago or not
         user=await UserModel.findOne({mobile})
        if(user) throw {staus:401,message:"this mobile is registered forago"};
        //check if the all team ids exist in team collection in DB
        teams?.forEach(value => {
            const team=  TeamtModel.findOne({_id:value});
            if(team) return true;
            throw {staus:401,message:"team not found"}
          });
        await UserModel.create({first_name,last_name,username,password,email,mobile,skills,roles,teams})
        res.status(200).json({
            status:res.statusCode,
            data:{
                message:"user added successfully",
            }
        })
        } catch (error) {
            next(error)
        }
    }
 }
 module.exports={
     UserController:new UserController()
 }