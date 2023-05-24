const { body, param } = require("express-validator");
const vorbidenValues=[""," ",0,NaN,undefined,null,"0"]
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
function editTeamValidation(){
    return[
        //name filed validation
        body("name").optional().notEmpty().withMessage("name of the team in not exist")
        .isLength({min:3,max:20}).withMessage("the name of team must be between 3 an 20 character")
        .custom((value,{req})=>{
            if(vorbidenValues.includes(value)) throw "name format is not true"
            return true
        }),
        //description filed validation
        body("description").optional().notEmpty().withMessage("description is not exist")
        .isLength({min:20,max:50}).withMessage("the desctiption of tean must be between 20 an 50 character")
        .custom((value,{req})=>{
            if(vorbidenValues.includes(value)) throw "description format is not true"
            return true
        }),
        
    ]
}
module.exports={
    createTeamValidation,
    ivniteUserToTeamValidation,
    editTeamValidation
}