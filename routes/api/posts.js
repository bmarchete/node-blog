const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/', (req,res,next) =>{

  mongoose.model('Post').find().then((docs) => {
    res.send(docs)
  },next)


});

router.get('/:id', (req,res,next) =>{

  const {id} = req.params

  mongoose.model('Post').find({_id: id}).then((doc) => {
    res.send(doc)
  },next)


});

router.post('/', function(req, res, next) {

  var Post = mongoose.model('Post');
  var post = new Post(req.body);
  post.author = "Binho";

  post.save().then((result) => {res.send(result)},next)


});

router.delete('/:id', (req,res,next)=>{
  const {id} = req.params

  mongoose.model('Post').remove({_id: id}).then((doc) => {
    res.send(doc)
  },next)
});

router.put('/:id', (req,res,next)=>{
  const {id} = req.params


  mongoose.model('Post').update(
    { _id: id },
    {
      $set: {
        title: req.body.title,
        author: req.body.author,
        brief: req.body.brief,
        body: req.body.body
      }
    }).then((doc) => {
      res.send(doc)
    },next);

  });



  module.exports = router;
