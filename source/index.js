const path = require('path');
const express = require ('express');
var session = require('express-session');
const hbs = require('hbs');
const bodyparser = require('body-parser');

var app = express();

var knex = require('knex')({
  client: 'mysql2',
  connection: {
    host : '127.0.0.1',
    user : 'root',
    password : '',
    database : 'tasklyst'
  }
});

app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'hbs');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extend:false}));
app.use('/assets',express.static(__dirname+'/public'));
app.use('/assets',express.static(__dirname+'/assets'));


app.get('/', (req,res) =>{
    res.sendFile(path.join(__dirname,'login.html'));
})

app.listen(8000,()=>{
    console.log('Server is Running at 8000');
    
})