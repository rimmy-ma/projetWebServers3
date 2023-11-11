// middleware/auth.js
const jwt = require('jsonwebtoken');
const db = require('../models'); // Assurez-vous que ce chemin est correct.
const Utilisateur = db.utilisateurs;

const secret = process.env.JWT_SECRET || 'votre_secret_ici'; // Vous devriez stocker cela dans une variable d'environnement.

// Middleware pour vérifier le token
const verifyToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization'];
  if (!token) {
    return res.status(403).send({ message: 'Aucun token fourni.' });
  }

  if (token.startsWith('Bearer ')) {
    // Supprime 'Bearer' du token
    token = token.slice(7, token.length);
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Token d'authentification invalide." });
    }
    req.userId = decoded.id;
    next();
  });
};

// Middleware pour vérifier si l'utilisateur est administrateur
const isAdmin = async (req, res, next) => {
  try {
    const utilisateur = await Utilisateur.findByPk(req.userId);
    const roles = await utilisateur.getRoles(); // Assurez-vous que la méthode getRoles est définie dans votre modèle utilisateur.
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].nom.toUpperCase() === "ADMIN") {
        next();
        return;
      }
    }

    res.status(403).send({ message: "Nécessite le rôle d'admin!" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
  verifyToken,
  isAdmin
};
