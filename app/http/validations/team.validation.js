const { body, param } = require("express-validator");

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
function ivniteUserToTeamValidation(){
    return[
        //name filed validation
        param("teamID").notEmpty().withMessage("id of the team in not exist")
        .isMongoId().withMessage("team is not found"),
        //description filed validation
        param("invitedPerson").notEmpty().withMessage("person id is not exist")
        .isMongoId().withMessage("person is not found"),
        //tages validation
        
    ]
}
module.exports={
    createTeamValidation,
    ivniteUserToTeamValidation
}