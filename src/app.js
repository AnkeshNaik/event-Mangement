
const express = require("express")

require("./db/conn");

const app =express();
const fs = require("fs");
const path = require("path");
const port =process.env.PORT || 4000;

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

app.get("/index", (req, res)=>{ 
    res.render('index')
})


// Our pug demo endpoint
app.get("/contact", (req, res)=>{ 
    res.render('contact')
});

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

app.get("/service", (req, res)=>{ 
    res.render('service')
});

// app.get("/",(req, res)=>{
//     res.send('index');

// })

app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
})