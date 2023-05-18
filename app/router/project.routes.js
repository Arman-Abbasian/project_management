const {Router}=require("express");
const { checkUserToken } = require("../http/middlewares/checkUserToken");
const { createProjectValidation, editProjectDataValidation } = require("../http/validations/project.validation");
const { expressValidator } = require("../http/middlewares/expressValidator");
const { ProjectController } = require("../http/controllers/project.controller");
const fileUpload = require("express-fileupload");
const { expressFileupload } = require("../http/middlewares/express-fileupload");
const { mongoIdValidation } = require("../http/validations/public");
const router=Router();
router.post("/create",fileUpload(),checkUserToken,createProjectValidation(),expressValidator,expressFileupload,ProjectController.createProject)
router.get("/allprojects",checkUserToken,ProjectController.getAllProjects)
router.get("/:id",checkUserToken,mongoIdValidation(),expressValidator,ProjectController.getProjectById)
router.delete("/:id",checkUserToken,mongoIdValidation(),expressValidator,ProjectController.deleteProjectById)
router.put("/:id",checkUserToken,mongoIdValidation(),editProjectDataValidation(),expressValidator,ProjectController.editProjectById)
module.exports={
    projectRoutes:router
}