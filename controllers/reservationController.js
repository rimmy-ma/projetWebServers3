const db = require('../models');
const Reservation = db.Reservation;

// Créer une nouvelle réservation
exports.create = (req, res) => {
  const { utilisateurId, dateReservation, activiteReservee, nombreParticipants, statutReservation } = req.body;

  Reservation.create({
    utilisateurId,
    dateReservation,
    activiteReservee,
    nombreParticipants,
    statutReservation
  })
    .then(reservation => {
      res.status(201).json(reservation);
    })
    .catch(err => {
      res.status(500).json({ message: "Une erreur s'est produite lors de la création de la réservation." });
    });
};

// Récupérer toutes les réservations
exports.findAll = (req, res) => {
  Reservation.findAll()
    .then(reservations => {
      res.status(200).json(reservations);
    })
    .catch(err => {
      res.status(500).json({ message: "Une erreur s'est produite lors de la récupération des réservations." });
    });
};

// Récupérer une seule réservation par ID
exports.findOne = (req, res) => {
  const { reservationId } = req.params;

  Reservation.findByPk(reservationId)
    .then(reservation => {
      if (!reservation) {
        res.status(404).json({ message: 'Réservation non trouvée.' });
        return;
      }
      res.status(200).json(reservation);
    })
    .catch(err => {
      res.status(500).json({ message: "Une erreur s'est produite lors de la récupération de la réservation." });
    });
};

// Mettre à jour une réservation par ID
exports.update = (req, res) => {
  const { reservationId } = req.params;
  const { dateReservation, activiteReservee, nombreParticipants, statutReservation } = req.body;

  Reservation.findByPk(reservationId)
    .then(reservation => {
      if (!reservation) {
        res.status(404).json({ message: 'Réservation non trouvée.' });
        return;
      }
      reservation.dateReservation = dateReservation;
      reservation.activiteReservee = activiteReservee;
      reservation.nombreParticipants = nombreParticipants;
      reservation.statutReservation = statutReservation;

      return reservation.save();
    })
    .then(updatedReservation => {
      res.status(200).json(updatedReservation);
    })
    .catch(err => {
      res.status(500).json({ message: "Une erreur s'est produite lors de la mise à jour de la réservation." });
    });
};

// Supprimer une réservation par ID
exports.delete = (req, res) => {
  const { reservationId } = req.params;

  Reservation.findByPk(reservationId)
    .then(reservation => {
      if (!reservation) {
        res.status(404).json({ message: 'Réservation non trouvée.' });
        return;
      }
      return reservation.destroy();
    })
    .then(() => {
      res.status(204).send();
    })
    .catch(err => {
      res.status(500).json({ message: "Une erreur s'est produite lors de la suppression de la réservation." });
    });
};
