const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  user:{
  type:mongoose.Schema.Types.ObjectId,
  ref:"User"
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  
  description:{
    type: String,
    required: true
  },
  image:{
    type:String,
  }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
