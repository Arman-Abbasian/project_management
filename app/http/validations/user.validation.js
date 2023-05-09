const {body}=require('express-validator');
const { UserModel } = require('../../models/user.model');
const { TeamtModel } = require('../../models/team.model');

function registerValidator(){
    return[
        //first_name field validation
        body("first_name").optional().isLength({min:2,max:15}).withMessage("first name must be between 2 until 15 character"),
        //last_name field validation
        body("last_name").optional().isLength({min:2,max:20}).withMessage("last name must be between 2 until 20 character"),
        //username field validation
        body("username").custom(async(value,ctx)=>{
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
        body("roles").custom((roles)=>{
            roles.forEach(role=>{
                if(role==="USER"||role==="ADMIN") return true;
                throw "please select USER or ADMIN"
            })
        }),
    ]
}
module.exports={registerValidator}