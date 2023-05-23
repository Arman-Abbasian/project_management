const { check } = require("express-validator");
const { TeamtModel } = require("../../models/team.model");
const { UserModel } = require("../../models/user.model");
const { hashData } = require("../../modules/hashData");

class UserController{
    //methods 
    async register(req,res,next){
        try {
        const {first_name,last_name,username,password,email,mobile,skills,roles,teams}=req.body;
        //check if the username is existed ago or not
        let user= await UserModel.findOne({username});
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
          const hashPassword=hashData(password)
          if(!hashPassword) throw({status:500,message:"internal server error"})
        await UserModel.create({first_name,last_name,username,password:hashPassword,email,mobile,skills,roles,teams})
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
    async updateProfile(req,res,next){
        try {
        const data={...req.body};
        const {first_name,last_name,skills}=data;
        const checkData={first_name,last_name,skills}
        for (const key in checkData) {
            if (checkData[key]===undefined) delete checkData[key]
        }
        console.log(req.user_id)
        const updatedData=await UserModel.updateOne({_id:req.user._id},{$set:checkData});
        if(updatedData.modifiedCount==1){
            res.status(200).json({
                status:res.statusCode,
                data:{
                    success:true,
                    message:"data updated successfully"
                }
            })
        }
        throw {status:500,message:"data could not updated"}
        } catch (error) {
            next(error)
        }
    }
    async uploadUserProfileImage(req,res,next){
        try {
            const userID=req.user._id;
            const filePath=req.file?.path?.substring(7);
            const imageLink=req.protocol+"://"+req.get("host")+"/"+filePath.replace(/[\\\\]/gm,"/")
            const result=await UserModel.updateOne({_id:userID},{$set:{profile_image:imageLink}})
            if(result.modifiedCount==0) throw({status:500,message:"server error"})
            res.status(200).json({
                status:res.statusCode,
                data:{
                    success:true,
                    message:"image uploaded successfully"
                }
            })
        } catch (error) {
            next (error)
        }
    }
    async getAllRequests(req,res,next){
        try {
            const userID=req.user._id;
            const allrequests=await UserModel.findOne({_id:userID},{inviteRequest:1})
            return res.status(200).json({
                status:res.statusCode,
                data:{
                    success:true,
                    allrequests:allrequests.inviteRequest
                }
            })
        } catch (error) {
            next(error)
        }
     }
     async getInvitingRquestsByStatus(req,res,next){
        const userID=req.user._id;
        const {status}=req.params
        const requests=await UserModel.aggregate([
            {
                $match:{_id:userID}
            },
            {
                $project:
                {
                    inviteRequest:1,
                    _id:0,
                    inviteRequest:{
                        $filter:{
                            input:"$inviteRequest",
                            as:"request",
                            cond:{
                                $eq:["$$request.status",status]
                            }
                        }
                    }
                }
            }
        ]);
        res.status(200).json({
            status:res.statusCode,
            data:{
                success:true,
                requests:requests[0].inviteRequest || [],
                message:"status fetched successfully"
            }
        })
    }
    async changeReuestStatus(req,res,next){
        try {
            const userID=req.user._id;
            const {id,status}=req.params;
            const request=await UserModel.findOne({_id:userID,"inviteRequest._id":id})
            console,log(request)
            if(!request) throw {status:400,message:"request not found"}
            const selectedRequest=request.inviteRequest.find(item=>item._id==id)
            console.log(selectedRequest)
           if (selectedRequest.status!=="pending") throw {status:400,message:"condition of request already certained"}
           const chageCondition=await UserModel.findOneAndUpdate({_id:userID,"inviteRequest._id":id},{
            $set:{"inviteRequest.$.status":status} 
           })
           if(chageCondition.modifiedCount==0) throw {status:400,message:"server error"}
           res.status(200).json({
            status:res.statusCode,
            data:{
                success:true,
                message:"request condition changed successfully"
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