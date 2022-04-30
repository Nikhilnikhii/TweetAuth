const mongoose = require('mongoose');

module.exports=mongoose.connect('mongodb://127.0.0.1:27017/TweetApp').then(console.log("DB connected succesfully")).catch(err=>{
    console.log(err);
});