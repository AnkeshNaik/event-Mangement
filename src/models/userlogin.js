const mongoose = require("mongoose")
const validator =require("validator")

const userSchema = mongoose.Schema({
   
    email:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email id")
            }
        }
    },
    // phone:{
    //     type:Number,
    //     required:true,
    //     min:10
    // },
    password:{
        type:String,
        required:true,
        minLength:3
    },


})



const User1 = mongoose.model("User1",userSchema);

module.exports = User1;