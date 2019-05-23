const express    = require('express');
const passport   = require('passport');
const router     = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const cloudinaryConfig   = require('../../config/cloudinary.config')
const Post = require('../../models/Post.model')


router.get('/create', ensureLoggedIn("/auth/login"),(req, res, next) => res.render("post/create", req.user))

router.post('/create', cloudinaryConfig.single('pic'), (req, res, next) => {
  const content = req.body.content
  const creatorId = req.user.id

  const picPath = req.file.url
  const picName = req.file.originalname

  const newPost = new Post({content, creatorId, picPath, picName})
  
  newPost.save()
    .then( thePost => res.redirect("/"))
    .catch(err => next(err))

})

module.exports = router