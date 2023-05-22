const { default: mongoose } = require("mongoose");

const IviteRequest=new mongoose.Schema({
    teamId:{type:mongoose.Types.ObjectId,required:true},
    caller:{type:mongoose.Types.ObjectId,required:true},
    requestDate:{type:Date,required:true},
    status:{type:String,default:"pending"}
})

const UserSchema=new mongoose.Schema({
    first_name:{type:String,trim:true},
    last_name:{type:String,trim:true},
    username:{type:String,required:true,unique:true,lowercase:true,trim:true},
    mobile:{type:String,required:true,unique:true},
    email:{type:String,required:true,unique:true,lowercase:true},
    password:{type:String,required:true},
    roles:{type:[String],default:["USER"]},
    skills:{type:[String],default:[]},
    teams:{type:[mongoose.Types.ObjectId],default:[]},
    profile_image:{type:String},
    token:{type:String,default:""},
    inviteRequest:{type:[IviteRequest],default:[]}
},{
    timestamps:true
})
const UserModel=mongoose.model("user",UserSchema);
module.exports={
    UserModel
}