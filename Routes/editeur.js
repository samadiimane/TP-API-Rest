const express = require('express');
const router = express.Router();
const EditeurModel = require('./Models/EditeurModel');


router.get('/all', async (req, res) => {
  try {
    const editeurs = await EditeurModel.find();
    res.json(editeurs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get('/names', async (req, res) => {
  try {
    const editeurs = await EditeurModel.find({}, 'nom');
    res.json(editeurs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.post('/add', async (req, res) => {
  const editeur = new EditeurModel({
    nom: req.body.nom,
    pays: req.body.pays,
    adresse: req.body.adresse,
    site_web: req.body.site_web
  });

  try {
    const newEditeur = await editeur.save();
    res.status(201).json(newEditeur);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


router.put('/update/:name', async (req, res) => {
  try {
    const editeur = await EditeurModel.findOneAndUpdate({ nom: req.params.name }, req.body, { new: true });
    if (!editeur) {
      return res.status(404).json({ message: "Éditeur non trouvé" });
    }
    res.json(editeur);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


router.delete('/delete/:name', async (req, res) => {
  try {
    const editeur = await EditeurModel.findOneAndDelete({ nom: req.params.name });
    if (!editeur) {
      return res.status(404).json({ message: "Éditeur non trouvé" });
    }
    res.json({ message: "Éditeur supprimé avec succès" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
