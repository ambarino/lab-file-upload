const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const PostSchema = Schema({
  content: String,
  creatorId: {type: Schema.Types.ObjectId, ref:"User"},
  picPath: String,
  picName: String,
  comments: [{
    content: String,
    authorId: String,
    imagePath: String,
    imageName: String
  }]
}, {timeStamps: true});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
