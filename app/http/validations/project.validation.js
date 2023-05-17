const { body } = require("express-validator");
const path=require("path")

function createProjectValidation(){
    return[
        //title filed validation
        body("title").notEmpty().withMessage("please enter the title of project"),
        //text filed validation
        body("text").notEmpty().withMessage("please enter the introduction of project")
        .isLength({min:20,max:50}).withMessage("the introduction of project must be between 20 an 50 character"),
        //tages validation
        body("tags").isArray({max:10}).withMessage("you can set maximum 10 tags"),
        //image field validation
        body("project_image").custom((value,{req})=>{
            const imageFile=req?.files?.project_image;
            if(!imageFile||Object.keys(imageFile).length==0) throw "please upload the project image"
            //check the format of file
            const fileFormat=path.extname(imageFile.name);
            const allwoedFormats= [".png",".jpg",".jpeg",".webp",".gif"];
            if(!allwoedFormats.includes(fileFormat)) throw "file format is not allowed"
            const maxSize=2*1024*1024;
            if(imageFile.size>maxSize) throw "file size is exceed";
            return true
        })
    ]
}
module.exports={
    createProjectValidation
}