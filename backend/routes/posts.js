const express =  require('express')

const Post = require('../models/post');

const router = express.Router()

router.post("/", (req,res, next)=>{
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

router.get('/',(req,res,next)=>{
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


router.put('/:id',(req,res,next)=>{
  const post = {
    title : req.body.title,
    content : req.body.content
  }
  Post.updateOne({ _id: req.params.id},post).then((result)=>{
    console.log(result)
    res.status(200).json({message:'Post updated successfully'})
  })
})

router.get("/:id", (req,res,next)=>{
  Post.findById({_id: req.params.id}).then(post=>{
    if (post){
      res.status(200).json(post)
    }else{
      res.status(404).json({message: 'Post not Found'})
    }
  })
})

router.delete("/:id", (req,res,next)=>{
  console.log(req.params.id);
  Post.deleteOne({_id:req.params.id}).then(result=>{
    console.log(result);
    res.status(200).json({message:"post deleted"})
  })
})


module.exports = router;
