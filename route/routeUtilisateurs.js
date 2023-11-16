// routes/utilisateurs.js
const express = require('express');
const router = express.Router();
const UtilisateurController = require('../controllers/utilisateurController');

// Routes pour les utilisateurs
router.get('/utilisateurs', UtilisateurController.getAllUtilisateurs);
router.post('/utilisateurs', UtilisateurController.createUser);
// Ajoutez d'autres routes pour les utilisateurs (Mise à jour, Suppression, etc.)

module.exports = router;