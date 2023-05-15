const { body } = require("express-validator");

function createProjectValidation(){
    return[
        body("title").notEmpty().withMessage("please enter the title of project"),
        body("text").notEmpty().withMessage("please enter the introduction of project")
        .isLength({min:20,max:50}).withMessage("the introduction of project must be between 20 an 50 character")
    ]
}
module.exports={
    createProjectValidation
}