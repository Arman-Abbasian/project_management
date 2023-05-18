const path=require("path");
const fs=require("fs")
function expressFileupload(req,res,next){
   try {
    let image=req.files.project_image
    //directory of uploading project image (just unitl folder)
    const uplaodUserProfileImagePath=path.join
    (__dirname,"..","..","..","public","projectProfileImage",""+req.body.title);
    //make the directory
    fs.mkdirSync(uplaodUserProfileImagePath,{recursive:true});
    //choose a neme for for your image
    const fileName=req.body.title+path.extname(image.name)
    //full address with file name(for image)
    const imageAddress=path.join(uplaodUserProfileImagePath,""+fileName);
    //part of a image url
    const image_address= path.join("projectProfileImage",""+req.body.title,""+fileName)
    //transfer the clinent image to the new adress that we have set
    image.mv(imageAddress,(err)=>{
        console.log(err)
        if(err) throw {status:500,message:"could not upload the image"}
    })
    //full section for image url
    const image_url=(req.protocol+"://"+req.get("host")+"/"+image_address).replace(/[\\]/ig,"/");
    req.body.image=image_url
    next()
   } catch (error) {
    next(error)
   }
}

module.exports={expressFileupload}