class UserController{
    //methods 
    register(req,res,next){
        const {username,password,email,mobile}=req.body
        res.status(200).json({
            status:res.statusCode,
            data:{
                message:"data added successfully",
                data:{username,password,email,mobile}
            }
        })
    }
 }
 module.exports={
     UserController:new UserController()
 }