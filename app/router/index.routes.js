const {Router}=require("express");
const {authRoutes} = require("./auth.routes");
const {projectRoutes} = require("./project.routes");
const {teamRoutes} = require("./team.routes");
const {userRoutes} = require("./user.routes");
const router=Router();
router.get("/",(req,res,next)=>{
    return res.json({
        message:"this is a new route"
    })
})
router.use("/auth",authRoutes);
router.use("/project",projectRoutes);
router.use("/team",teamRoutes);
router.use("/user",userRoutes)

module.exports={
    AllRoutes:router
}