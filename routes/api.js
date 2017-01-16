const express = require('express');
const router = express.Router();
// const mongoose = require('mongoose');
const Post = require('../models/posts');

router.get('/', (req,res,next) =>{

  // Post.find({},(err,docs)=>{
  //   if (err) {
  //     return res.send(err)
  //   }
  //   res.send(docs);
  // })

  Post.find().then((docs) => {
    res.send(docs)
  },next)


});

router.post('/save', function(req, res, next) {

  const post = new Post(req.body);
  // post.save((err, post)=>{
  //   if (err) { return res.send(err) }
  //   res.sendStatus(200)
  // })

  post.save().then((result) => {res.send(result)},next)


});


module.exports = router;
