const path=require("path")
const fs =require("fs")

function expressFileuploadEdited(req,project){
     let image=req.files.project_image
     //directory of uploading project image (just unitl folder)
     const uplaodProjectProfileImagePath=path.join
     (__dirname,"..","..","public","projectProfileImage",""+project.title);
     console.log(uplaodProjectProfileImagePath)
     fs.rmSync(uplaodProjectProfileImagePath,{recursive:true})
     //make the directory
     fs.mkdirSync(uplaodProjectProfileImagePath);
     //choose a neme for for your image
     const fileName=project.title+path.extname(image.name)
     //full address with file name(for image)
     const imageAddress=path.join(uplaodProjectProfileImagePath,""+fileName);
     //part of a image url
     const image_address= path.join("projectProfileImage",""+project.title,""+fileName)
     //transfer the clinent image to the new adress that we have set
     image.mv(imageAddress,(err)=>{
         if(err) throw {status:500,message:"could not upload the image"}
     })
     //full section for image url
     const image_url=(req.protocol+"://"+req.get("host")+"/"+image_address).replace(/[\\]/ig,"/");
     req.body.image=image_url
     return true
 }
module.exports={expressFileuploadEdited}