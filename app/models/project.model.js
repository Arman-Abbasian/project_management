const { default: mongoose } = require("mongoose");

const ProjectSchema=new mongoose.Schema({
    title:{type:String,reqiured:true,min:3,max:20},
    text:{type:String,reqiured:true,min:20,max:50},
    image:{type:String,default:"/defaults/default.png"},
    owner:{type:mongoose.Types.ObjectId,reqiured:true},
   team:{type:mongoose.Types.ObjectId},
   private:{type:Boolean,default:true},
   tags:{type:[String],default:[]}
},{
    timestamps:true
})
const ProjectModel=mongoose.model("project",ProjectSchema);
module.exports={
    ProjectModel
}