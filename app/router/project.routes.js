const {Router}=require("express");
const { checkUserToken } = require("../http/middlewares/checkUserToken");
const { createProjectValidation } = require("../http/validations/project.validation");
const { expressValidator } = require("../http/middlewares/expressValidator");
const { ProjectController } = require("../http/controllers/project.controller");
const router=Router();
router.post("/create",checkUserToken,createProjectValidation(),expressValidator,ProjectController.createProject)
module.exports={
    projectRoutes:router
}