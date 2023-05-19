const {Router}=require("express");
const { checkUserToken } = require("../http/middlewares/checkUserToken");
const { createTeamValidation } = require("../http/validations/team.validation");
const { expressValidator } = require("../http/middlewares/expressValidator");
const { TeamController } = require("../http/controllers/team.controller");
const { mongoIdValidation } = require("../http/validations/public");
const router=Router();
router.post("/create",checkUserToken,createTeamValidation(),expressValidator,TeamController.createTeam)
router.get("/getAllTeams",checkUserToken,TeamController.getAllTeams)
router.get("/me",checkUserToken,TeamController.getMyTeams)
router.get("/:id",checkUserToken,mongoIdValidation(),expressValidator,TeamController.getTeamById)
router.delete("/:id",checkUserToken,mongoIdValidation(),expressValidator,TeamController.deleteTeamById)
module.exports={
    teamRoutes:router
}