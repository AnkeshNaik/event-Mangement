
const express = require("express")

require("./db/conn");

const app =express();
// const bcrypt =require(bcrypt)
const fs = require("fs");
const path = require("path");
const port =process.env.PORT || 3000;

// const User1 =require("./models/userlogin")
const User1 =require("./models/mongodb")
const User =require("./models/usermessage")
const hbs = require("hbs");
// const  response  = require("express");



// ***static path***
// const staticpath =path.join(__dirname,"../public_static");
// app.use(express.static(staticpath))



const partialpath =path.join(__dirname,"../templates/partials");
const templatepath =path.join(__dirname,"../templates/views");


app.set('/css',express.static(path.join(__dirname,"../node_modules/bootstrap/dist/css")));
app.set("/js",express.static(path.join(__dirname,"../node_modules/bootstrap/dist/js")));
app.set("/jq",express.static(path.join(__dirname,"../node_modules/jquery/dist")));


app.use(express.json());
app.use(express.urlencoded({extended:false}))


app.set("views", templatepath);

hbs.registerPartials(partialpath);


// // Set the template engine as hbs
app.set('view engine', 'hbs')

// app.get("/login", (req, res)=>{ 
//     res.render('login')
// })


// Our pug demo endpoint
// app.get("/contact", (req, res)=>{ 
//     res.render('contact')
// });


app.get("/",(req, res)=>{
    res.render('login');

})

app.get("/contact",(req, res)=>{
    res.render('contact');

})
app.post("/contact", async(req,res)=>{
    try{
        // res.send(req.body)
        const userData = new User(req.body);
        await userData.save();
        res.status(201).render("index");
    }catch(error){
        res.status(500).send(error);
    }
})


app.get("/about", (req, res)=>{ 
    res.render('about')
});
app.get("/signup", (req, res)=>{ 
    res.render('signup')
});

app.get("/service", (req, res)=>{ 
    res.render('service')
});





app.get("/login",(req, res)=>{
    res.render('login');

})

app.post("/signup",async(req,res)=>{
    const data = {
        
        email:req.body.email,
        password:req.body.password

    }

    await User1.insertMany([data])
    res.render("signup")
})


app.post("/login",async(req,res)=>{
    try{
     const check = await User1.findOne({email:req.body.email})   
     if(check.password===req.body.password){
         res.render("contact")
     }
     else{
         res.send("wrong password")
        

     }
    }
    catch{
        res.send("wrong details")
    }
})

app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
})