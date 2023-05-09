const {body}=require('express-validator');

function loginValidator(){
    return[
        //username field validation
        body("username").notEmpty().withMessage("please enter the username").custom((value)=>{
            if(value){
                const usernameRegex=/^[a-z][a-z0-9\.\_]{3,}/gi;
                if(usernameRegex.test(value)){
                    return true
                }
                throw "username format is wrong"
            }
            return "please enter username"
        }),
        //password field validation
        body("password").notEmpty().withMessage("please enter the password").isLength({ min: 5, max:14 })
        .withMessage("password must be between 6 and 14 character")
        
    ]
}
module.exports={loginValidator}