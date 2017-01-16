const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const moment = require('moment');

router.get('/', (req,res,next) =>{

  mongoose.model('Post').find().then((docs) => {
    res.render('posts/index', { posts: docs, moment: moment, title: 'Todas postagens'});
  },next)


});

router.get('/create', (req,res,next)=>{

  res.render('posts/create', {title: 'Nova postagem'});

});

router.get('/edit/:id', (req,res,next)=>{

  const {id} = req.params

  mongoose.model('Post').findOne({_id: id}).then((doc) => {
      res.render('posts/edit', {title: 'Editar postagem', post: doc});
  },next)


});

router.get('/:id', (req,res,next) =>{

  const {id} = req.params

  mongoose.model('Post').findOne({_id: id}).then((doc) => {
    res.render('posts/post', {post: doc, title: "Artigo especifico", moment: moment} )
  },next)


});

router.post('/', function(req, res, next) {

  var Post = mongoose.model('Post');
  var post = new Post(req.body);
  post.author = "Binho";

  post.save().then((result) => {res.redirect('/')},next)


});

router.delete('/:id', (req,res,next)=>{
  const {id} = req.params

  mongoose.model('Post').remove({_id: id}).then((doc) => {
    res.redirect('/')
  },next)
});

router.put('/:id', (req,res,next)=>{
  const {id} = req.params


  mongoose.model('Post').update(  { _id: id },
    {
      $set: {
        title: req.body.title,
        author: "Binho updated",
        brief: req.body.brief,
        body: req.body.body
      }
    }).then((doc) => {
      res.redirect('/')
    },next);

  });



  module.exports = router;
