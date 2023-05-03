const {Router}=require("express");
const router=Router();
router.get("/",(req,res,next)=>{
    return res.json({
        message:"this is a new route"
    })
})
module.exports={
    AllRoutes:router
}