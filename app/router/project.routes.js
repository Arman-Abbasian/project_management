const {Router}=require("express");
const { checkUserToken } = require("../http/middlewares/checkUserToken");
const { createProjectValidation } = require("../http/validations/project.validation");
const { expressValidator } = require("../http/middlewares/expressValidator");
const { ProjectController } = require("../http/controllers/project.controller");
const fileUpload = require("express-fileupload");
const { expressFileupload } = require("../http/middlewares/express-fileupload");
const router=Router();
router.post("/create",fileUpload(),checkUserToken,createProjectValidation(),expressValidator,expressFileupload,ProjectController.createProject)
module.exports={
    projectRoutes:router
}