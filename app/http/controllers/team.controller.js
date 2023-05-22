const { TeamtModel } = require("../../models/team.model");
const { UserModel } = require("../../models/user.model");

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
    async inviteUserToTeam(req,res,next){
      try {
        //person that is logged in
        const user=req.user._id;
        //get the id of team and the id of person that we want to invite he/she(from params)
        const {teamID,invitedPerson}=req.params;
        //check if the any team with the logged in user as the owner of team existed or not
        const team=await TeamtModel.findOne({_id:teamID,owner:user})
        if(!team) throw {status:404,message:"team not found"}
        //check if the invited user in User collection existed or not
        const personInvite=await UserModel.findOne({_id:invitedPerson})
        if(!personInvite) throw {status:404,message:"invited person not found"}
        //check if the invited person was not existed in our team bofore
        const existedInvitePersonInTeamBefore=await TeamtModel.findOne({
            $or:[{owner:invitedPerson},{users:invitedPerson}]
        },
        {_id:teamID}
    )
        if(existedInvitePersonInTeamBefore)  throw {status:404,message:"invited person is already in the team"}
        //check if the link for this team alredy is sent for he/she or not
        const existInvitedPersonBefore=await UserModel.findOne({_id:invitedPerson},
            {inviteRequest:{$elemMatch: {teamId:teamID}}})
        if(existInvitedPersonBefore) throw {status:404,message:"invited link is sent already"}
        const request={teamId:teamID,caller:user,requestDate:new Date.now(),status:"pending"}
       const addInviteLinkToinviteRequestField= await UserModel.findOneAndUpdate({_id:invitedPerson}
        ,{$push:{inviteRequest:request}})
       if(addInviteLinkToinviteRequestField.modifiedCount==0) throw {status:500,message:"server error"}
        res.status(200).json({
            status:res.statusCode,
            data:{
                success:true,
                message:"invite link is sent successfully"
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