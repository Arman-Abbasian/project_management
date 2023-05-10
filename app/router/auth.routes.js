const {Router}=require("express");
const { loginValidator } = require("../http/validations/auth.validation");
const { AuthController } = require("../http/controllers/auth.controller");
const { expressValidator } = require("../http/middlewares/expressValidator");
const { checkUserToken } = require("../http/middlewares/checkUserToken");
const router=Router();
router.post("/login",loginValidator(),expressValidator,AuthController.login);
router.get("/profile",checkUserToken,AuthController.profile);
module.exports={
    authRoutes:router
}