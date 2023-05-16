const path=require("path");
const fs=require("fs")
function expressFileupload(req,res,next){
   try {
    let image=req.files.project_image
    //address for uploading project image files
    const uplaodUserProfileImagePath=path.join
    (__dirname,"..","..","..","public","projectProfileImage",""+req.body.title);
    //make the directory
    fs.mkdirSync(uplaodUserProfileImagePath,{recursive:true});
    const fileName=req.body.title+path.extname(image.name)
    const imageAddress=path.join
    (__dirname,"..","..","..","public","projectProfileImage",""+req.body.title,""+fileName);
    const image_address= path.join("projectProfileImage",""+req.body.title,""+req.body.title+path.extname(req.files.project_image.name))
    image.mv(imageAddress,(err)=>{
        console.log(err)
        if(err) throw {status:500,message:"could not upload the image"}
    })
    const image_url=(req.protocol+"://"+req.get("host")+"/"+image_address).replace(/[\\]/ig,"/");
    req.body.image=image_url
    next()
   } catch (error) {
    next(error)
   }
}
module.exports={expressFileupload}