const {Router}=require("express");
const { checkUserToken } = require("../http/middlewares/checkUserToken");
const { createTeamValidation } = require("../http/validations/team.validation");
const { expressValidator } = require("../http/middlewares/expressValidator");
const { TeamController } = require("../http/controllers/team.controller");
const router=Router();
router.post("/create",checkUserToken,createTeamValidation(),expressValidator,TeamController.createTeam)
router.get("/getAllTeams",checkUserToken,TeamController.getAllTeams)
module.exports={
    teamRoutes:router
}