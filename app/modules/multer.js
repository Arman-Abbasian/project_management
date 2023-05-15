const multer = require("multer");
const { createImageDirectory } = require("./createImageDirectory");
const path=require("path");

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,createImageDirectory(req))
    },
    filename:(req,file,cb)=>{
       const type=path.extname(file.originalname);
       cb(null,Date.now()+type)
    }
});
const uploadUserProfileImageWithMulter=multer({storage:storage})
module.exports={uploadUserProfileImageWithMulter}