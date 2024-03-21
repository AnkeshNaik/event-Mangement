//atlas password 23NDCvtBQfRtBnLn
//mongodb+srv://ankeshnaik000:23NDCvtBQfRtBnLn@event1.now48mu.mongodb.net/?retryWrites=true&w=majority&appName=event1
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

const Usera = require("./models/usermessage");
const User2 = require("./models/event");


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
app.get("/add_event",(req, res)=>{
    res.render('add_event');

})

app.get("/contact",(req, res)=>{
    res.render('contact');

})
app.get("/calender",(req, res)=>{
    res.render('calender');

})
app.post("/contact", async(req,res)=>{
    try{
        // res.send(req.body)
        const userData = new Usera(req.body);
        await userData.save();
        res.render("index");
    }catch(error){
        res.status(500).send(error);
    }
})



app.get("/get_events", (req, res)=>{ 
    res.render('get_events')
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
app.get("/home",(req, res)=>{
    res.render('home');

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

// **************************
// app.set('view engine', 'ejs');
app.post('/add_event', async(req, res) => {
    const eventData = {
      name: req.body.name,
      event_name: req.body.event_name,
      date: req.body.event_date,
      time: req.body.event_time,
      location: req.body.event_location
    };
    User2.insertMany([eventData])
    res.render("get_events")

  });
  
  // Handle GET requests to retrieve events

//   app.get('/get_events', async(req, res) => {
//     const db = client.db(dbName);
//     const events = db.collection('events');
//     events.find().sort({ date: 1 }).toArray((err, result) => {
//       if (err) {
//         console.log('Error retrieving events:', err);
//         res.status(500).send('Error retrieving events');
//       } else {
//         res.send(result);
//       }
//     });
//   });


// GET /get_events endpoint to retrieve events in sorted order of date
// Import the Event model


// POST /get_events endpoint to retrieve events based on form submission
// app.get('/get_events', async (req, res) => {
//     try {
//       const events = await User2.find().sort({ date: 1 });
//       res.render("events_view", {
//         name: req.body.event_name,
//         date: req.body.event_date,
//         time: req.body.event_time,
//         location: req.body.event_location
//     });
//     } catch (err) {
//       console.error('Error retrieving events:', err);
//       res.status(500).send('Error retrieving events');
//     }
//   });

  app.post("/get_events",async(req,res)=>{
    try{
     const check = await User2.findOne({name:req.body.name})   
     if(check.name===req.body.name){
           const events = await User2.find({});
        const eventTable = `
          <html>
          <head>
            <title>Event Management</title>
           
            <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f5f5f5;
            }
            h1 {
              text-align: center;
              color: #2b2d42;
            }
            table {
              margin: auto;
              border-collapse: collapse;
              background-color: #ffffff;
              width: 100%;
              box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
            }
            th, td {
              border: 1px solid #dddddd;
              text-align: left;
              padding: 8px;
            }
            th {
              background-color: #2b2d42;
              color: #ffffff;
            }
            tr:nth-child(even) {
              background-color: #f2f2f2;
            }
            tr:hover {
              background-color: #dddddd;
            }
          </style>
          </head>
          <body>
            <h1>Event Management</h1>
            <table>
              <thead>
                <tr>
                  <th>Event Name</th>
                  <th>Event Date</th>
                  <th>Event Time</th>
                  <th>Event Location</th>
                </tr>
              </thead>
              <tbody>
                ${events.map((User2) => `
                  <tr>
                    <td>${User2.event_name}</td>
                    <td>${User2.date}</td>
                    <td>${User2.time}</td>
                    <td>${User2.location}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </body>
          </html>
        `;
        res.send(eventTable);
      }
    
     else{
         res.send("wrong password")
        

     }
  }
    catch{
        res.send("wrong details")
    }
})



app.get('/delete1', (req, res) => {
  try{  res.send(`
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <title>Delete Events</title>
      <style>
        body {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background: linear-gradient(45deg, greenyellow, dodgerblue);
          font-family: "Sansita Swashed", cursive;
        }
        .center {
          position: relative;
          padding: 50px 50px;
          background: #fff;
          border-radius: 10px;
        }
        .center h1 {
          font-size: 2em;
          border-left: 5px solid dodgerblue;
          padding: 10px;
          color: #000;
          letter-spacing: 5px;
          margin-bottom: 60px;
          font-weight: bold;
          padding-left: 10px;
        }
        .center .inputbox {
          position: relative;
          width: 300px;
          height: 50px;
          margin-bottom: 50px;
        }
        .center .inputbox input {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          border: 2px solid #000;
          outline: none;
          background: none;
          padding: 10px;
          border-radius: 10px;
          font-size: 1.2em;
        }
        .center .inputbox:last-child {
          margin-bottom: 0;
        }
        .center .inputbox span {
          position: absolute;
          top: 14px;
          left: 20px;
          font-size: 1em;
          transition: 0.6s;
          font-family: sans-serif;
        }
        .center .inputbox input:focus ~ span,
        .center .inputbox input:valid ~ span {
          transform: translateX(-13px) translateY(-35px);
          font-size: 1em;
        }
        
        
        .center input[type="submit"] {
          display: inline-block;
          width: 100px;
          height: 40px;
          margin-top: 5px;
          border: none;
          border-radius: 20px;
          background-color: dodgerblue;
          color: white;
          font-size: 1em;
          font-weight: bold;
          cursor: pointer;
        }
        
        .center input[type="submit"]:hover {
          background-color: #0059b3;
        }
        
      </style>
    </head>
    <body>


    
      <div class="center">
        <h1>Delete Events</h1>
        <form action="/delete5" method="post">
        <div class="inputbox">
          <label for="searchQuery">1.Enter event name to delete:</label>
          
          <div class="inputbox">
          <input type="text" name="searchQuery" id="searchQuery" placeholder="Event name..."><p></p>
        </div>
        
        </div>
        <div class="inputbox">
        <input type="submit" value="Delete">
        
        </div>
        </form>
        <form action="/delete" method="post">
        
        <label for="deleteBeforeToday">2.Delete events before today:</label>
          <div class="inputbox">
            <input type="submit" value="Confirm">
          </div>
        </form>
        <p>Note: Once an event is deleted, it cannot be recovered.</p>
      </div>
    </body>
  </html>
    
    `);
} catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});
  
  

  app.post('/delete', async (req, res) => {
    try {
      // Get the current time
      const now = new Date();
      
      // Define the MongoDB query to delete expired events
      const filter = { date: { $lte: now } };
      const deletedEvents = await User2.find(filter);
      if (!deletedEvents) {
            return res.status(404).send('Event not found');
        }
      // Delete the expired events from the User2 collection
      const result = await User2.deleteMany(filter);
      
      // Get the number of events deleted
      const deletedCount = result.deletedCount;
      
      // Retrieve the details of the deleted events
     
      
      // Display the number and details of the deleted events in an HTML table with CSS styling
      res.send(`
      <html>
        <head>
          <meta charset="utf-8">
          <title>Event Deleted</title>
          <style>
          body {
              font-family: Arial, sans-serif;
              background-color: #f5f5f5;
            }
            h1 {
              text-align: center;
              color: #2b2d42;
            }
            table {
              margin: auto;
              border-collapse: collapse;
              background-color: #ffffff;
              width: 100%;
              box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
            }
            th, td {
              border: 1px solid #dddddd;
              text-align: left;
              padding: 8px;
            }
            th {
              background-color: #2b2d42;
              color: #ffffff;
            }
            tr:nth-child(even) {
              background-color: #f2f2f2;
            }
            tr:hover {
              background-color: #dddddd;
            }
            p{
              align-items: center;
              color: red;
          }
          </style>
        </head>
        <body>
          <h1>Event Deleted</h1>
          <p>${deletedCount} event(s) have been deleted.</p>

     
        <table>
          <thead>
            <tr>
              <th>Event Name</th>
              <th>Event Date</th>
              <th>Event Time</th>
              <th>Event Location</th>
            </tr>
          </thead>
          <tbody>
            ${deletedEvents.map(event => `
              <tr>
                <td>${event.name}</td>
                <td>${event.event_name}</td>
                <td>${event.date}</td>
                <td>${event.time}</td>
                <td>${event.location}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        </body>
      </html>
    `);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
  });



  
  app.post('/delete5', async (req, res) => {
    try {
   // Get the current time
//    const now = new Date();
const searchQuery = req.body.searchQuery;
      
   // Define the MongoDB query to delete expired events
   const filter = { name: searchQuery };
   const deletedEvents = await User2.find(filter);
if (!deletedEvents) {
  return res.status(404).send('Event not found');
}
   // Delete the expired events from the User2 collection
   const result = await User2.deleteMany(filter);
   
   // Get the number of events deleted
   const deletedCount = result.deletedCount;

      
      // Display the number of deleted events in an HTML form with CSS styling
      res.send(`
        <html>
          <head>
            <meta charset="utf-8">
            <title>Event Deleted</title>
            <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f5f5f5;
              }
              h1 {
                text-align: center;
                color: #2b2d42;
              }
              table {
                margin: auto;
                border-collapse: collapse;
                background-color: #ffffff;
                width: 100%;
                box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
              }
              th, td {
                border: 1px solid #dddddd;
                text-align: left;
                padding: 8px;
              }
              th {
                background-color: #2b2d42;
                color: #ffffff;
              }
              tr:nth-child(even) {
                background-color: #f2f2f2;
              }
              tr:hover {
                background-color: #dddddd;
              }
              p{
                align-items: center;
                color: red;
            }
            </style>
          </head>
          <body>
            <h1>Event Deleted</h1>
            <p>${deletedCount} event(s) have been deleted.</p>

       
          <table>
            <thead>
              <tr>
                <th>Event Name</th>
                <th>Event Date</th>
                <th>Event Time</th>
                <th>Event Location</th>
              </tr>
            </thead>
            <tbody>
              ${deletedEvents.map(event => `
                <tr>
                  <td>${event.name}</td>
                  <td>${event.event_name}</td>
                  <td>${event.date}</td>
                  <td>${event.time}</td>
                  <td>${event.location}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          </body>
        </html>
      `);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal server error');
    }

  });
  
  
  
// *****************************

app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
})