const mongoose =require("mongoose")

// mongoose.connect("localhostpath")

const LoginSchema=new mongoose.Schema({
    email:{
        
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const User1 = mongoose.model("c1",LoginSchema);
module.exports = User1;