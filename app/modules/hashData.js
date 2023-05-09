const bcrypt=require("bcrypt")
function hashData(data){
const salt=bcrypt.genSaltSync(10);
return bcrypt.hashSync(data,salt)
};
function compareHash(data,hashedData){
    return bcrypt.compareSync(data,hashedData)
}
module.exports={hashData,compareHash}