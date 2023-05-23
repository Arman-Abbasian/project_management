const {body, param}=require('express-validator');
const path=require("path")

function registerValidator(){
    return[
        //first_name field validation
        body("first_name").optional().isLength({min:2,max:15}).withMessage("first name must be between 2 until 15 character"),
        //last_name field validation
        body("last_name").optional().isLength({min:2,max:20}).withMessage("last name must be between 2 until 20 character"),
        //username field validation
        body("username").notEmpty().withMessage("please enter the username").custom(async(value,ctx)=>{
            if(value){
                const usernameRegex=/^[a-z][a-z0-9\.\_]{3,}/gi;
                if(usernameRegex.test(value)){
                    return true
                }
                throw "username format is wrong"
            }
            return "please enter username"
        }),
        //email field validation
        body("email").notEmpty().withMessage("please enter the email").isEmail().withMessage("email format is wrong"),
        //mobile field validation
        body("mobile").notEmpty().withMessage("please enter the mobile number").isMobilePhone("fa-IR")
        .withMessage("mobile phone is wrong"),
        //password and passwrod_confirm fields validation
        body("password").isLength({ min: 5, max:14 }).withMessage("password must be between 6 and 14 character")
        .custom((value,ctx)=>{
            if(!value) throw "please enter the password"
            if(value!=ctx.req?.body?.confirm_password) throw "cofirm password must match"
            return true
        }),
        body("roles").optional().custom((roles)=>{
            roles?.forEach(role=>{
                if(role==="USER"||role==="ADMIN") return true;
                throw "please select USER or ADMIN"
            })
        }),
    ]
}
function updateUserValidation(){
    return[
        //first_name field validation
        body("first_name").optional().isLength({min:2,max:15}).withMessage("first name must be between 2 until 15 character"),
        //last_name field validation
        body("last_name").optional().isLength({min:2,max:20}).withMessage("last name must be between 2 until 20 character"),
        body("skills").optional().isArray().withMessage("format is wrong"),
        body("skills.*").notEmpty().withMessage("please send skills")
    ] 
}
function userProfileImageValidation(){
    return[
        //image field validation
        body("profile_image").custom((value,{req})=>{
            if(Object.keys(req.file).length==0) throw "please upload a file"
            const fileFormat=path.extname(req.file.originalname);
            const allwoedFormats= [".png",".jpg",".jpeg",".webp",".gif"];
            if(!allwoedFormats.includes(fileFormat)) throw "file format is not allowed"
            const maxSize=2*1024*1024;
            if(req.file.size>maxSize) throw "file size is exceed";
            return true
        })
        
    ] 
}
function statusValidation(){
    return[
        param("status").notEmpty().withMessage("please enter the status").custom((value,{req})=>{
            if(!["pending","accepted","rejected"].includes(value.toLowerCase())) throw "status is wrong";
            return true;
        })
    ]
}
module.exports={
    registerValidator,
    updateUserValidation,
    userProfileImageValidation,
    statusValidation
}