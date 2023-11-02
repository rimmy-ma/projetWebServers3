// routes/evenements.js
const express = require('express');
const router = express.Router();
const EvenementController = require('../controllers/EvenementController');

// Créer un nouvel événement
router.post('/evenements', EvenementController.createEvenement);

// Récupérer tous les événements
router.get('/evenements', EvenementController.getAllEvenements);

// Récupérer un événement par ID
router.get('/evenements/:id', EvenementController.getEvenementById);

// Mettre à jour un événement
router.put('/evenements/:id', EvenementController.updateEvenement);

// Supprimer un événement
router.delete('/evenements/:id', EvenementController.deleteEvenement);

module.exports = router;