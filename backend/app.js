const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const postsRoutes = require('./routes/posts.js');
const { create } = require('./models/post');

const app = express();

// mongoose.set('useUnifiedTopology', true)
mongoose.set('useUnifiedTopology',true);

mongoose.connect("mongodb+srv://akash_ry:fypVh91bcDOj9sB3@cluster0.ell11.mongodb.net/node-angular?retryWrites=true&w=majority", {useNewUrlParser:true})
  .then(()=>{
    console.log('Connected to database')
  })
  .catch((err)=>{
    console.log('failed',err)
  })

app.use(bodyParser.json());

// optional in this case
app.use(bodyParser.urlencoded({extended:false}));

app.use((req,res,next) =>{
  res.setHeader("Access-Control-Allow-Origin","*")
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type,Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/posts", postsRoutes);

module.exports = app;

