const DB_URL="mongodb://127.0.0.1:27017/project_management"
const PORT=process.env.PORT
const {Application}=require("./app/server")
require("dotenv").config()
new Application(PORT,DB_URL)
