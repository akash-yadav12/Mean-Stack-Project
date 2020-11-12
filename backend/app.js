const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post');

const app = express();

// mongoose.set('useUnifiedTopology', true)
mongoose.set('useUnifiedTopology',true);

mongoose.connect("mongodb+srv://akash_ry:fypVh91bcDOj9sB3@cluster0.ell11.mongodb.net/test?retryWrites=true&w=majority", {useNewUrlParser:true})
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
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/posts", (req,res, next)=>{
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  console.log(post)
  res.status(201).json({
    message: 'Post added Successfully'
  });
});

app.get('/api/posts',(req,res,next)=>{
  const posts = [
    {
      id:'fasdf233331',
      title:'First post from server',
      content: 'This is coming from the backend server'
    },
    {
      id:'aksah989298',
      title:'Second post from server',
      content: 'This is coming from the backend server'
    }
  ];
  res.status(200).json({
    message: 'Posts fetched successfully',
    posts: posts
  });
});


module.exports = app;

