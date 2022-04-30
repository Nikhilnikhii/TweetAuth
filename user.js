const mongoose=require('mongoose');


const {Schema}=mongoose;

const mySchema=new Schema({
    name:{
        type:String
    },
    email:{
        type:String,
        required:true
    }
});

module.exports=mongoose.model('User',mySchema);