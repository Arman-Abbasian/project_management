const {body}=require('express-validator');

function registerValidator(){
    return[
        body("username").custom((value,ctx)=>{
            if(value){
                const usernameRegex=/^[a-z][a-z0-9\.\_]{3,}/gi;
                if(usernameRegex.test(value)){
                    return true
                }
                throw "username format is wrong"
            }
            return "please enter username"
        }),
        body("email").notEmpty().withMessage("please enter the email").isEmail().withMessage("email format is wrong"),
        body("mobile").notEmpty().withMessage("please enter the mobile number").isMobilePhone("fa-IR").withMessage("mobile phone is wrong"),
        body("password").isLength({ min: 5, max:14 }).withMessage("password must be between 6 and 14 character")
        .custom((value,ctx)=>{
            if(!value) throw "please enter the password"
            if(value!=ctx.req?.body?.confirm_password) throw "cofirm password must match"
            return true
        })
    ]
}
module.exports={registerValidator}