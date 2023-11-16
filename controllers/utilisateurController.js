const db = require('../models');
const Utilisateur = db.utilisateurs;
const bcrypt = require('bcrypt');

// Ajouter un nouvel utilisateur
exports.create = (req, res) => {
  // Valider la requête...

  // Hacher le mot de passe avant de le sauvegarder
  bcrypt.hash(req.body.motDePasse, 10, (err, hash) => {
    if (err) {
      res.status(500).send({
        message: "Erreur lors du hachage du mot de passe."
      });
      return;
    }

    // Créer un utilisateur avec le mot de passe haché
    const utilisateur = {
      nom: req.body.nom,
      prenom: req.body.prenom,
      email: req.body.email,
      motDePasse: hash, // Stocker le mot de passe haché
    };

    // Sauvegarder l'utilisateur dans la base de données
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
  });
};

// Reste des opérations CRUD...

module.exports = exports;
