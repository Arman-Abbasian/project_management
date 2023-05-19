const { param } = require("express-validator");
const path=require("path")

function mongoIdValidation(){
    return[
        //title filed validation
        param("id").notEmpty().withMessage("please enter your projectId")
        .isMongoId().withMessage("your data is not found"),
    ]
}
module.exports={
    mongoIdValidation
}