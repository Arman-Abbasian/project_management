const { default: mongoose } = require("mongoose");

const UserSchema=new mongoose.Schema({
    first_name:{type:String},
    last_name:{type:String},
    username:{type:String,reqiured:true,unique:true},
    mobile:{type:String,reqiured:true,unique:true},
    email:{type:String,reqiured:true,unique:true},
    password:{type:String,reqiured:true},
    roles:{type:[String],default:["USER"]},
    skills:{type:[String],reqiured:[]},
    teams:{type:[mongoose.Types.ObjectId],default:[]},
},{
    timestamps:true
})
const UserModel=mongoose.model("user",UserSchema);
module.exports={
    UserModel
}