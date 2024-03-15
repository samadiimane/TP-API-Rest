const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const UserModel = require('../Models/UserModel');

dotenv.config();

const app = express();

app.use(bodyParser.json());

mongoose.connect(process.env.URL_MONGOOSE, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Connexion à MongoDB réussie");
}).catch((err) => {
  console.error("Erreur de connexion à MongoDB :", err);
  process.exit(1);
});


app.post('/register', async (req, res) => {
  try {
    const existingUser = await UserModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: 'Utilisateur déjà existant' });
    }


    const hashedPassword = await bcrypt.hash(req.body.mdp, 10);


    const newUser = new UserModel({
      email: req.body.email,
      nom_complet: req.body.nom_complet,
      username: req.body.username,
      mdp: hashedPassword
    });


    await newUser.save();

    res.status(201).json({ message: 'Utilisateur enregistré avec succès' });
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement de l\'utilisateur:', error);
    res.status(500).json({ message: 'Erreur lors de l\'enregistrement de l\'utilisateur' });
  }
});


app.post('/login', async (req, res) => {
  try {

    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

  
    const passwordMatch = await bcrypt.compare(req.body.mdp, user.mdp);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Mot de passe incorrect' });
    }

    const token = jwt.sign({ email: user.email, userId: user._id }, process.env.TOKEN, { expiresIn: '1h' });

    res.status(200).json({ message: 'Connexion réussie', token: token });
  } catch (error) {
    console.error('Erreur lors de la connexion de l\'utilisateur:', error);
    res.status(500).json({ message: 'Erreur lors de la connexion de l\'utilisateur' });
  }
});


app.use('/auteurs', require('./Routes/auteur'));
app.use('/editeur', require('./Routes/editeur'));
app.use('/livre', require('./Routes/livre'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
