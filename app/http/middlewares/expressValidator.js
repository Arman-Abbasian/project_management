const { validationResult } = require("express-validator");

function expressValidator(req,res,next){
    let messages={};
    const result=validationResult(req);
    console.log(result.errors)
    if(result?.errors?.length>0){
        result.errors.forEach(error => {
            messages[error.path]=error.msg
        });
        return res.status(400).json({
            status:res.statusCode,
            errors:{
                message:messages
            }
        })
    }
    next()
}
module.exports={
    expressValidator
}