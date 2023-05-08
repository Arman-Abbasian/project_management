const DB_URL="mongodb://127.0.0.1:27017/project_management"
const PORT=3000
const {Application}=require("./app/server")
console.log("yes")
new Application(PORT,DB_URL)
