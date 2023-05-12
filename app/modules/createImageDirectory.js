const path=require("path");
const fs=require("fs")
function createImageDirectory(req){

    const uplaodUserProfileImagePath=path.join(__dirname,"..","..","public","userProfileImage",""+req.user.mobile);
    fs.mkdirSync(uplaodUserProfileImagePath,{recursive:true});
    console.log("uplaodUserProfileImagePath")
    return path.join("public","userProfileImage",""+req.user.mobile)
}
module.exports={createImageDirectory}