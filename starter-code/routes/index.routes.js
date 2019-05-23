const express = require('express');
const router  = express.Router();
const Post = require('../models/Post.model')

/* GET home page. */
router.get('/', (req, res, next) => {

  Post.find()
    .then( allPost => {
      res.render('index', { title: 'Express - Generated with IronGenerator', post: allPost});

    })
});

module.exports = router;
