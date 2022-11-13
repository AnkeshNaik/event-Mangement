const mongoose= require('mongoose');

mongoose.connect('mongodb://localhost:27017/ankesh03',{
    // useCreateIndex:true,
    // useNewUrlPraser:true,
    useUnifiedTopology:true

}).then(()=>{
    console.log(`connect successful`);
}).catch((e)=>{
    console.log(e);
})
// },(err)=>{
//     if(err){
//         console.log(err)
//     }else{
//         console.log("connection successful")
//     }
// })

// const mongoose = require('mongoose');
// const uri = "mongodb://localhost:27017/sehat"

// const connectDB = async()=>{
//     mongoose.connect(uri,()=>{
//         console.log("Connected to mongo");
//     })
// }

// module.exports = connectDB;

