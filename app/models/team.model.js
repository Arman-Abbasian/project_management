const { default: mongoose } = require("mongoose");

const TeamSchema=new mongoose.Schema({
    name:{type:String,reqiured:true},
    description:{type:String},
    users:{type:[mongoose.Types.ObjectId],default:[]},
    owner:{type:mongoose.Types.ObjectId,reqiured:true},
},{
    timestamps:true
})
const TeamtModel=mongoose.model("team",TeamSchema);
module.exports={
    TeamtModel
}