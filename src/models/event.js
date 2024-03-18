const mongoose =require("mongoose")

// mongoose.connect("localhostpath")


    const event = new  mongoose.Schema({
        name: {
          type: String,
          required: true
        },
        date: {
          type: Date,
          required: true
        },
        time: {
          type: String,
          required: true
        },
        location: {
          type: String,
          required: true
        }
      });


const User2= mongoose.model("Collection2",event);
module.exports = User2;

