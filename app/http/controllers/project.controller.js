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
 }
 module.exports={
     ProjectController:new ProjectController()
 }