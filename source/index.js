const path = require('path');
const express = require ('express');
var session = require('express-session');
const hbs = require('hbs');
const bodyparser = require('body-parser');

var app = express();
var session = require('express-session');
var flash = require('req-flash');

var knex = require('knex')({
  client: 'mysql2',
  connection: {
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'tasklyst'
  }
});

app.use(cookieParser());
app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'hbs');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extend:true}));
app.use('/assets',express.static(__dirname+'/public'));
app.use('/assets',express.static(__dirname+'/assets'));
app.use(session({
  secret: 'djhxcvxfgshajfgjhgsjhfgsakjeauytsdfy',
  resave: false,
  saveUninitialized: true
  }));

app.all("/*", function (req, res, next) {

  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Credentials",true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Accept,X-Access-Token,X-Key,Authorization,X-Requested-With,Origin,Access-Control-Allow-Origin,Access-Control-Allow-Credentials');
  if (req.method === 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});

app.get('/', (req,res) =>{
    res.sendFile(path.join(__dirname,'login.html'));
})
app.post('/login',(req,res)=>{
  // console.log(req.body);
 
  
    // loginData = JSON.stringify(req.body);
    loginData = (req.body);
    console.log(loginData);
      var uemail = loginData.email;
      var pass = loginData.pass;
    if(uemail != null || uemail != undefined){
    knex('tlyst_users')
    .where({user_email: uemail})
    .select('*')
    .then(rows =>{
      // console.log(rows);
      if(rows.length >= 1){
        var user_pin =  rows[0].user_pin;
        var user_name = rows[0].user_name;
        var user_id = rows[0].user_id;
      if(pass == user_pin){
        // Successfully loggedin
        // add user details to sessions
        req.session.uemail = uemail;
        req.session.uname =  user_name;
        req.session.userid = user_id;

        
        res.redirect("add_task.html");

      }
      else{
        // Password Incorrect
        res.send("Incorrect Password");

      } 
    }
      else{
        // No user with this Name
        res.send("Incorrect Username");

      }
    })
  }
    


})

app.listen(8000,()=>{
    console.log('Server is Running at 8000');
    
})