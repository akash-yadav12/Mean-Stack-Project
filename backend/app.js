const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post');
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

app.post("/api/posts", (req,res, next)=>{
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then(createdPost =>{
    res.status(201).json({
      message: 'Post added Successfully',
      postId: createdPost._id
    });
  });
  console.log(post)

});

app.get('/api/posts',(req,res,next)=>{
  Post.find()
    .then(documents =>{
      console.log(documents);
      res.status(200).json({
        message: 'Posts fetched successfully',
        posts: documents
      });
    })
    .catch(err=>{
      console.log(err)
    });
});


app.put('/api/posts/:id',(req,res,next)=>{
  const post = {
    title : req.body.title,
    content : req.body.content
  }
  Post.updateOne({ _id: req.params.id},post).then((result)=>{
    console.log(result)
    res.status(200).json({message:'Post updated successfully'})
  })
})

app.get("/api/posts/:id", (req,res,next)=>{
  Post.findById({_id: req.params.id}).then(post=>{
    if (post){
      res.status(200).json(post)
    }else{
      res.status(404).json({message: 'Post not Found'})
    }
  })
})

app.delete("/api/posts/:id", (req,res,next)=>{
  console.log(req.params.id);
  Post.deleteOne({_id:req.params.id}).then(result=>{
    console.log(result);
    res.status(200).json({message:"post deleted"})
  })
})

module.exports = app;

