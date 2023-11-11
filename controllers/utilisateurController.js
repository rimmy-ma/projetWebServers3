// controllers/utilisateurController.js
const db = require('../models'); // The path may vary depending on your structure.
const Utilisateur = db.utilisateurs;

// Ajouter un nouvel utilisateur
exports.create = (req, res) => {
  // Validate request...
  
  // Create a User
  const utilisateur = {
    nom: req.body.nom,
    prenom: req.body.prenom,
    email: req.body.email,
    motDePasse: req.body.motDePasse, // Think about hashing the password!
  };

  // Save User in the database
  Utilisateur.create(utilisateur)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Une erreur s'est produite lors de la création de l'utilisateur."
      });
    });
};

// Rest of CRUD operations...

module.exports = exports;
