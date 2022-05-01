const router=require('express').Router();
const passport = require('passport');


//twitter oauth routes starts heree

router.get("/twitterLogin",passport.authenticate("twitter",{scope:['email']}),(req,res)=>{

    res.send("welcome to login with twitter page")
});

router.get("/auth/twitterLogin/callback",passport.authenticate("twitter",{successRedirect:"/dashboard",failureRedirect:"/"}),(req,res)=>{

    res.send("welcome to login with twitter callback page");
});

//twitter oauth routes ends heree



// router.get("/instaLogin",passport.authenticate("instagram",{scope:['email']}),(req,res)=>{

//     res.send("welcome to login with instagram page")
// });

// router.get("/auth/instagram/callback",passport.authenticate("instagram",{successRedirect:"/dashboard",failureRedirect:"/"}),(req,res)=>{

//     res.send("welcome to login with instagram callback page");
// });




//github oauth routes starts heree

router.get("/githubLogin",passport.authenticate("github",{ scope: [ 'user:email' ] }),(req,res)=>{

    res.send("welcome to login with github login page")
});

router.get("/auth/githubLogin/callback",passport.authenticate("github",{successRedirect:"/dashboard",failureRedirect:"/"}),(req,res)=>{

    res.send("welcome to login with github callback page");
});


//github oauth routes ends heree


router.get("/logout",(req,res)=>{

    req.logOut();
    res.send("user logged out succesfully");
    

    
});

router.get("/dashboard",(req,res)=>{
    res.send("Dashboard page");
});

module.exports=router;