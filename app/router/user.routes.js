const {Router}=require("express");
const { registerValidator, updateUserValidation, userProfileImageValidation } = require("../http/validations/user.validation");
const { expressValidator } = require("../http/middlewares/expressValidator");
const { UserController } = require("../http/controllers/user.controller");
const { checkUserToken } = require("../http/middlewares/checkUserToken");
const { uploadUserProfileImageWithMulter } = require("../modules/multer");
const router=Router();
router.post("/register",registerValidator(),expressValidator,UserController.register);
router.put("/updateProfile",checkUserToken,updateUserValidation(),expressValidator,UserController.updateProfile);
router.post("/profile_image",checkUserToken,uploadUserProfileImageWithMulter.single("profile_image"),
userProfileImageValidation(),expressValidator,UserController.uploadUserProfileImage);

module.exports={
    userRoutes:router
}