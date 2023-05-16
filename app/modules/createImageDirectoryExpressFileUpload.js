const path=require("path");
const fs=require("fs")
function createImageDirectoryExpressFileUpload(req){
    //address for uploading project image files
    const uplaodUserProfileImagePath=path.join(__dirname,"..","..","public","projectProfileImage",""+req.body.title);
    //make the directory
    fs.mkdirSync(uplaodUserProfileImagePath,{recursive:true});
    return path.join("public","projectProfileImage",""+req.body.title)
}
module.exports={createImageDirectoryExpressFileUpload}