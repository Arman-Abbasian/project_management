const { ProjectModel } = require("../../models/project.model");

class ProjectController{
    //methods 
    async createProject(req,res,next){
        try {
            const {title,text,image,tags}=req.body;
            console.log(image)
            const owner=req.user._id;
            const sameTitleProject=await ProjectModel.findOne({title})
            if(sameTitleProject) throw {status:400,message:"this title has registered ago"}
            //create the project in collection
          const result= await ProjectModel.create({title,text,owner,image,tags})
          if(!result) throw{status:400,message:"project not created"}
          res.status(201).json({
            status:res.statusCode,
            data:{
                success:true,
                message:"project created successfully"
            }
          })
        } catch (error) {
            next(error)
        }
    }
    async getAllProjects(req,res,next){
        try {
            const user=req.user._id;
            const projects=await ProjectModel.find({owner:user})
            if(!projects) throw {status:404,message:"can not find any project"}
            res.status(200).json({
                status:res.statusCode,
                data:{
                    success:true,
                    projects
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async getProjectById(req,res,next){
        try {
            const user=req.user._id;
            const projectId=req.params.id;
            const project=await ProjectModel.findOne({owner:user,_id:projectId})
            if(!project) throw {status:404,message:"project not found"}
        res.status(200).json({
            success:true,
            project,
        })
        } catch (error) {
            next (error)
        }
    }
    async deleteProjectById(req,res,next){
        try {
            const user=req.user._id;
            const projectId=req.params.id;
            const project=await ProjectModel.findOneAndDelete({owner:user,_id:projectId})
        if(!project) throw {status:404,message:"project not found"}
        res.status(200).json({
            project,
            success:true,
            message:"project removed successfully",
        })
        } catch (error) {
            next(error)
        }
    }
 }
 module.exports={
     ProjectController:new ProjectController()
 }