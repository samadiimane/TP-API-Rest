const express = require('express');
const router = express.Router();
const AuteurModel = require('./Models/AuteurModel');
const EditeurModel = require('./Models/EditeurModel');


router.get('/all', async (req, res) => {
  try {
    const auteurs = await AuteurModel.find();
    res.json(auteurs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get('/names', async (req, res) => {
  try {
    const auteurs = await AuteurModel.find({}, 'nom');
    res.json(auteurs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get('/editeurs', async (req, res) => {
  try {
    const auteurs = await AuteurModel.find();
    const result = await Promise.all(auteurs.map(async (auteur) => {
      const nombreEditeurs = await EditeurModel.countDocuments({ auteur: auteur.nom });
      return { nom: auteur.nom, nombre_editeurs: nombreEditeurs };
    }));
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.post('/add', async (req, res) => {
  const auteur = new AuteurModel({
    nom: req.body.nom,
    prenom: req.body.prenom,
    date_naissance: req.body.date_naissance,
    nationalite: req.body.nationalite,
    genre_litteraire: req.body.genre_litteraire
  });

  try {
    const newAuteur = await auteur.save();
    res.status(201).json(newAuteur);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


router.put('/update/:name', async (req, res) => {
  try {
    const auteur = await AuteurModel.findOneAndUpdate({ nom: req.params.name }, req.body, { new: true });
    if (!auteur) {
      return res.status(404).json({ message: "Auteur non trouvé" });
    }
    res.json(auteur);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


router.delete('/delete/:name', async (req, res) => {
  try {
    const auteur = await AuteurModel.findOneAndDelete({ nom: req.params.name });
    if (!auteur) {
      return res.status(404).json({ message: "Auteur non trouvé" });
    }
    res.json({ message: "Auteur supprimé avec succès" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
