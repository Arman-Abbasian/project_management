const { body } = require("express-validator");

function createTeamValidation(){
    return[
        //name filed validation
        body("name").notEmpty().withMessage("please enter the title of project")
        .isLength({min:3,max:20}).withMessage("the name of team must be between 3 an 20 character"),
        //description filed validation
        body("description").notEmpty().withMessage("please enter the description of team")
        .isLength({min:20,max:50}).withMessage("the desctiption of tean must be between 20 an 50 character"),
        //tages validation
        
    ]
}
module.exports={createTeamValidation}