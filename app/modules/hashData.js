const bcrypt=require("bcrypt")
function hashData(data){
const salt=bcrypt.genSaltSync(10);
return bcrypt.hashSync(data,salt)
};
module.exports={hashData}