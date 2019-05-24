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

router.post("/comment/:id", [ensureLoggedIn("/auth/login"), cloudinaryConfig.single('imgComment')],(req,res,next) => {
  const content = req.body.content
  const authorId = req.user.id
  
  const imagePath = req.file.url
  const imageName = req.file.originalname

  const newComment = {content: "asdasdasda" ,authorId, imagePath, imageName}
  const postId = req.params.id

  Post.findByIdAndUpdate(postId, {$push: {comments: newComment}})
    .then( comment => {
      
      res.redirect("/")
    })
})

module.exports = router