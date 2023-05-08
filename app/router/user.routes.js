const {Router}=require("express");
const { registerValidator } = require("../http/validations/user.validation");
const { expressValidator } = require("../http/middlewares/expressValidator");
const { UserController } = require("../http/controllers/user.controller");
const router=Router();
router.post("/register",registerValidator(),expressValidator,UserController.register);

module.exports={
    userRoutes:router
}