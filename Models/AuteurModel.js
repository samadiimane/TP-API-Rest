const mongoose = require('mongoose');


const auteurSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true
  },
  prenom: {
    type: String
  },
  date_naissance: {
    type: Date
  },
  nationalite: {
    type: String
  },
  genre_litteraire: {
    type: String
  }
});


const AuteurModel = mongoose.model('Auteur', auteurSchema);

module.exports = AuteurModel;
