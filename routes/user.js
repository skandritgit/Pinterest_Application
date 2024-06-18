const mongoose = require('mongoose');

const plm=require("passport-local-mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/pinterest",{
// useCreateIndex:true,
// useNewUrlParser:true,
// useUnifiedTopology:true,
// useFindAndModify:false

}).then(()=>{
    console.log("connection is successfull...");
}).catch((error)=>{
    console.log("NOT connecting .....")
})

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
  },
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  }],
  dp: {
    type: String,

  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  fullname: {
    type: String,
    required: true,
    
  },
});

userSchema.plugin(plm);

const User = mongoose.model('User', userSchema);

module.exports = User;
