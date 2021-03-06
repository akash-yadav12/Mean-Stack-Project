const express =  require('express');
const multer = require('multer');

const Post = require('../models/post');

const router = express.Router();

const Mime_Type_Map = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
  destination: (req, file, cb) =>{
    const isValid = Mime_Type_Map[file.mimetype];
    let error = new Error("Invalid mime type");
    if(isValid){
      error = null;
    }
    cb(error, "backend/images")
  },
  filename: (req, file, cb)=>{
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = Mime_Type_Map[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
});

router.post("/",multer({storage:storage}).single("image"), (req,res, next)=>{
  const url = req.protocol + "://" + req.get("host");
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    imagePath: url + "/images/" + req.file.filename

  });
  post.save().then(createdPost =>{
    res.status(201).json({
      message: 'Post added Successfully',
      post:{
        ...createdPost,
        id: createdPost._id
        // title: createdPost.title,
        // content: createdPost.content,
        // imagePath: createdPost.imagePath
      }
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
