const {Router}=require("express");
const { registerValidator, updateUserValidation, userProfileImageValidation, statusValidation } = require("../http/validations/user.validation");
const { expressValidator } = require("../http/middlewares/expressValidator");
const { UserController } = require("../http/controllers/user.controller");
const { checkUserToken } = require("../http/middlewares/checkUserToken");
const { uploadUserProfileImageWithMulter } = require("../modules/multer");
const { mongoIdValidation } = require("../http/validations/public");
const router=Router();
router.post("/register",registerValidator(),expressValidator,UserController.register);
router.put("/updateProfile",checkUserToken,updateUserValidation(),expressValidator,UserController.updateProfile);
router.get("/allrequests",checkUserToken,UserController.getAllRequests)
router.post("/profile_image",checkUserToken,uploadUserProfileImageWithMulter.single("profile_image"),
userProfileImageValidation(),expressValidator,UserController.uploadUserProfileImage);
router.get("/requests/changeRequests/:id/:status",checkUserToken,mongoIdValidation(),expressValidator,statusValidation(),expressValidator
,UserController.changeReuestStatus)
router.get("/requests/:status",checkUserToken,statusValidation(),expressValidator,UserController.getInvitingRquestsByStatus);

module.exports={
    userRoutes:router
}