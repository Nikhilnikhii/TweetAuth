const router=require('express').Router();
const passport = require('passport');


router.get("/twitterLogin",passport.authenticate("twitter",{scope:['email']}),(req,res)=>{

    res.send("welcome to login with twitter page")
});

router.get("/auth/twitterLogin/callback",passport.authenticate("twitter",{successRedirect:"/dashboard",failureRedirect:"/"}),(req,res)=>{

    res.send("welcome to login with twitter callback page");
});


router.get("/logout",(req,res)=>{

    req.logOut();
    res.send("user logged out succesfully");
    

    
});

router.get("/dashboard",(req,res)=>{
    res.send("Dashboard page");
});

module.exports=router;