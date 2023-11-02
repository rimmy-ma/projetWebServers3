// routes/reservations.js
const express = require('express');
const router = express.Router();
const ReservationController = require('../controllers/ReservationController');

// Créer une nouvelle réservation
router.post('/reservations', ReservationController.createReservation);

// Récupérer toutes les réservations
router.get('/reservations', ReservationController.getAllReservations);

// Récupérer une réservation par ID
router.get('/reservations/:id', ReservationController.getReservationById);

// Mettre à jour une réservation
router.put('/reservations/:id', ReservationController.updateReservation);

// Supprimer une réservation
router.delete('/reservations/:id', ReservationController.deleteReservation);

module.exports = router;