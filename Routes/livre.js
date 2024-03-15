const express = require('express');
const router = express.Router();
const LivreModel = require('./Models/LivreModel');
const verifyToken = require('../Middleware/auth');


router.use(verifyToken);


router.get('/all', async (req, res) => {
  try {
    const livres = await LivreModel.find();
    res.json(livres);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get('/auteurs/:livrename', async (req, res) => {
  try {
    const livre = await LivreModel.findOne({ titre: req.params.livrename }).populate('auteur');
    if (!livre) {
      return res.status(404).json({ message: "Livre non trouvé" });
    }
    res.json(livre.auteur);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get('/editeurs/:livrename', async (req, res) => {
  try {
    const livre = await LivreModel.findOne({ titre: req.params.livrename }).populate('editeur');
    if (!livre) {
      return res.status(404).json({ message: "Livre non trouvé" });
    }
    res.json(livre.editeur);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get('/listCategorie/:category', async (req, res) => {
  try {
    const livres = await LivreModel.find({ genre: req.params.category });
    res.json(livres);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get('/:annee1/:annee2', async (req, res) => {
  try {
    const livres = await LivreModel.find({ date_publication: { $gte: new Date(req.params.annee1), $lte: new Date(req.params.annee2) } });
    res.json(livres);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.post('/add', async (req, res) => {
  const livre = new LivreModel({
    titre: req.body.titre,
    auteur: req.body.auteur,
    editeur: req.body.editeur,
    genre: req.body.genre,
    date_publication: req.body.date_publication,
    prix: req.body.prix
  });

  try {
    const newLivre = await livre.save();
    res.status(201).json(newLivre);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


router.put('/update/:name', async (req, res) => {
  try {
    const livre = await LivreModel.findOneAndUpdate({ titre: req.params.name }, req.body, { new: true });
    if (!livre) {
      return res.status(404).json({ message: "Livre non trouvé" });
    }
    res.json(livre);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


router.delete('/delete/:name', async (req, res) => {
  try {
    const livre = await LivreModel.findOneAndDelete({ titre: req.params.name });
    if (!livre) {
      return res.status(404).json({ message: "Livre non trouvé" });
    }
    res.json({ message: "Livre supprimé avec succès" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
