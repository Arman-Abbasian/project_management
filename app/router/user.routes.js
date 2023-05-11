const {Router}=require("express");
const { registerValidator, updateUserValidation } = require("../http/validations/user.validation");
const { expressValidator } = require("../http/middlewares/expressValidator");
const { UserController } = require("../http/controllers/user.controller");
const { checkUserToken } = require("../http/middlewares/checkUserToken");
const router=Router();
router.post("/register",registerValidator(),expressValidator,UserController.register);
router.put("/updateProfile",checkUserToken,updateUserValidation(),expressValidator,UserController.updateProfile);

module.exports={
    userRoutes:router
}