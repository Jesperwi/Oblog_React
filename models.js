const mongoose = require('mongoose'); 
const Schema = mongoose.Schema
const bcrypt = require('bcrypt');

const postSchema = new Schema({
    title: String,
    description: String,
    image: String,
    description1: String,
    image1: String,
    description2: String,
    image2: String,
})
 
const userSchema = new Schema({
  Username: {type: String, required: true},
  Password: {type: String, required: true},
});

userSchema.statics.hashPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};

userSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.Password);
};

let Post = mongoose.model('Post', postSchema, 'posts');
let User = mongoose.model('User', userSchema, 'user');

module.exports.Post = Post;
module.exports.User = User;