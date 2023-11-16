const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../models');
const Utilisateur = db.utilisateurs;
const { verifyToken, isAdmin } = require('../models/auth'); // Importez les fonctions de middleware d'authentification

const secret = process.env.JWT_SECRET || 'votre_secret_ici'; //aucun pour le moment

// Contrôleur pour l'inscription d'un nouvel utilisateur
exports.signup = (req, res) => {
  const { nom, prenom, email, motDePasse } = req.body;

  // Vérifiez si l'utilisateur existe déjà par son email
  Utilisateur.findOne({ where: { email: email } })
    .then(user => {
      if (user) {
        return res.status(400).json({ message: 'L\'utilisateur existe déjà.' });
      }

      // Créez un nouvel utilisateur avec un mot de passe hashé
      const hashedPassword = bcrypt.hashSync(motDePasse, 8);

      Utilisateur.create({
        nom: nom,
        prenom: prenom,
        email: email,
        mot_de_passe: hashedPassword
      })
        .then(user => {
          // Générez un token JWT pour l'utilisateur nouvellement inscrit
          const token = jwt.sign({ id: user.id }, secret, {
            expiresIn: 86400
          });

          res.status(201).json({ auth: true, token: token });
        })
        .catch(err => {
          res.status(500).json({ message: 'Une erreur s\'est produite lors de l\'inscription.' });
        });
    })
    .catch(err => {
      res.status(500).json({ message: 'Une erreur s\'est produite lors de la vérification de l\'utilisateur.' });
    });
};

// Contrôleur pour la connexion d'un utilisateur
exports.login = (req, res) => {
  const { email, motDePasse } = req.body;

  // Vérifiez si l'utilisateur existe par son email
  Utilisateur.findOne({ where: { email: email } })
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvé.' });
      }

      // Vérification du mot de passe actuel au mot de passe haché
      const passwordIsValid = bcrypt.compareSync(motDePasse, user.mot_de_passe);

      if (!passwordIsValid) {
        return res.status(401).json({ message: 'Mot de passe incorrect.' });
      }

      // Générez un token JWT pour l'utilisateur connecté
      const token = jwt.sign({ id: user.id }, secret, {
        expiresIn: 86400
      });

      res.status(200).json({ auth: true, token: token });
    })
    .catch(err => {
      res.status(500).json({ message: 'Une erreur s\'est produite lors de la connexion.' });
    });
};

// Contrôleur pour la déconnexion de l'utilisateur (si nécessaire)
exports.logout = (req, res) => {
  res.status(200).json({ auth: false, token: null });
};

// Contrôleur pour la vérification de l'authentification d'un utilisateur
exports.verifyAuth = (req, res) => {
  res.status(200).json({ auth: true });
};

// Contrôleur pour la vérification du rôle administrateur
exports.verifyAdminRole = (req, res) => {
  res.status(200).json({ isAdmin: true });
};
