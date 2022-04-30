const cookieParser = require('cookie-parser');
const cookieSession=require('cookie-session');
require('./database');
const express=require('express');
const routes=require("./routes");
const User=require("./user");
const passport=require('passport')
require("./passport");

const app=express();


app.use(cookieSession({
    name:"session",
    keys:["this is a key"],
    maxAge:24*60*60*1000
}));

app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());


app.use("/",routes);



app.get("/",(req,res)=>{
    res.send("Home page");
});



app.listen(4000,(req,res)=>{
    console.log("server is running on port 4000 ....");
});