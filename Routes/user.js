const express = require('express');
const router = express.Router();
const UserModel = require('./Models/UserModel');


router.get('/all', async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get('/names', async (req, res) => {
  try {
    const users = await UserModel.find({}, 'nom_complet');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.post('/add', async (req, res) => {
  const user = new UserModel({
    email: req.body.email,
    nom_complet: req.body.nom_complet,
    username: req.body.username,
    mdp: req.body.mdp
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


router.put('/update/:name', async (req, res) => {
  try {
    const user = await UserModel.findOneAndUpdate({ nom_complet: req.params.name }, req.body, { new: true });
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


router.delete('/delete/:name', async (req, res) => {
  try {
    const user = await UserModel.findOneAndDelete({ nom_complet: req.params.name });
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    res.json({ message: "Utilisateur supprimé avec succès" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
