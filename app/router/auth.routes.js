const {Router}=require("express");
const { loginValidator } = require("../http/validations/auth.validation");
const { AuthController } = require("../http/controllers/auth.controller");
const { expressValidator } = require("../http/middlewares/expressValidator");
const router=Router();
router.post("/login",loginValidator(),expressValidator,AuthController.login);
module.exports={
    authRoutes:router
}