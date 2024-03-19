const mongoose = require("mongoose")
const validator =require("validator")

const userSchema = mongoose.Schema({

    message:{
        type:String,
        required:true,
        minLength:3
    },

    name:{
        type:String,
        required:true,
        minLength:3
    },
    email:{
        type:String,
        // required:true,
        // validate(value){
        //     if(!validator.isEmail(value)){
        //         throw new Error("Invalid email id")
        //     }
        // }
    },
    // phone:{
    //     type:Number,
    //     required:true,
    //     min:10
    // },


})

const Usera= mongoose.model("Usera",userSchema);

module.exports = Usera;