const { default: mongoose } = require("mongoose");

const ProjectSchema=new mongoose.Schema({
    title:{type:String,reqiured:true},
    text:{type:String},
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