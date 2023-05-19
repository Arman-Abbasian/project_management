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
 }
 module.exports={
     TeamController:new TeamController()
 }