const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true, 
    unique: true 
  },
  nom_complet: {
    type: String,
    minlength: 5 
  },
  username: {
    type: String,
    minlength: 5 
  },
  mdp: {
    type: String
  }
});


const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
