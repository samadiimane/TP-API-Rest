const mongoose = require('mongoose');


const livreSchema = new mongoose.Schema({
  titre: {
    type: String,
    required: true 
  },
  auteur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Auteur', 
    required: true
  },
  editeur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Editeur', 
    required: true
  },
  genre: {
    type: String
  },
  date_publication: {
    type: Date
  },
  prix: {
    type: Number
  }
});


const LivreModel = mongoose.model('Livre', livreSchema);

module.exports = LivreModel;
