function configApplication(app,express){
    const path=require("path")
    app.use(express.json());
    app.use(express.urlencoded({extended:true}));
    app.use(express.static(path.join(__dirname,"..","public")));
}
module.exports={
    configApplication
}