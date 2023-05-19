const { TeamtModel } = require("../../models/team.model");

class TeamController{
    //methods 
    async createTeam(req,res,next){
       try {
        const owner=req.user._id
        const {name,description}=req.body;
        const teamName=await TeamtModel.findOne({name})
        if(teamName) throw {status:500,message:"name is repetative please select another name"}
        const newTeam=await TeamtModel.create({name,description,owner})
        if(!newTeam) throw {status:500,message:"team could not be created"}
        res.status(201).json({
            status:res.statusCode,
            data:{
                success:true,
                message:"team created successfully"
            }
        })
       } catch (error) {
        next(error)
       }
       
    }
    async getAllTeams(req,res,next){
        const owner=req.user._id;
        const teams=await TeamtModel.find({owner:owner})
        if(!teams) throw {status:404,message:"could not find any team"}
        res.status(200).json({
            status:res.statusCode,
            data:{
                teams,
                success:true,
                message:"teams fetched successfully"
            }
        })
    }
    async getTeamById(req,res,next){
        try {
            const teamId=req.params.id;
            const team=await TeamtModel.findById(teamId);
            if(!team) throw {status:404,message:"team not found"}
            res.status(200).json({
                status:res.statusCode,
                data:{
                    team,
                    success:true,
                    message:"team finded successfully"
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async getMyTeams(req,res,next){
        try {
            const userId=req.user._id;
            const teams=await TeamtModel.find({
                $or:[{owner:userId},{users:userId}]
            });
            if(!teams) throw {status:404,message:"any team not found"}
            res.status(200).json({
                status:res.statusCode,
                data:{
                    teams,
                    success:true,
                    message:"team finded successfully"
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async deleteTeamById(req,res,next){
        try {
            const userId=req.user._id;
            const teamId=req.params.id;
            const teams=await TeamtModel.findOneAndDelete({owner:userId,_id:teamId})
            if(!teams) throw {status:404,message:"any team not found"}
            res.status(200).json({
                status:res.statusCode,
                data:{
                    success:true,
                    message:"team deleted successfully"
                }
            })
        } catch (error) {
            next(error)
        }
    }
 }
 module.exports={
     TeamController:new TeamController()
 }