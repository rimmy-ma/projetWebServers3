const db = require('../models');
const Evenement = db.Evenement;

// Créer un nouvel événement
exports.create = (req, res) => {
  const { titreEvenement, dateEvenement, descriptionEvenement, placesDisponibles, organisateurId, statutEvenement } = req.body;

  Evenement.create({
    titreEvenement,
    dateEvenement,
    descriptionEvenement,
    placesDisponibles,
    organisateurId,
    statutEvenement
  })
    .then(evenement => {
      res.status(201).json(evenement);
    })
    .catch(err => {
      res.status(500).json({ message: "Une erreur s'est produite lors de la création de l'événement." });
    });
};

// Récupérer tous les événements
exports.findAll = (req, res) => {
  Evenement.findAll()
    .then(evenements => {
      res.status(200).json(evenements);
    })
    .catch(err => {
      res.status(500).json({ message: "Une erreur s'est produite lors de la récupération des événements." });
    });
};

// Récupérer un seul événement par ID
exports.findOne = (req, res) => {
  const { evenementId } = req.params;

  Evenement.findByPk(evenementId)
    .then(evenement => {
      if (!evenement) {
        res.status(404).json({ message: 'Événement non trouvé.' });
        return;
      }
      res.status(200).json(evenement);
    })
    .catch(err => {
      res.status(500).json({ message: "Une erreur s'est produite lors de la récupération de l'événement." });
    });
};

// Mettre à jour un événement par ID
exports.update = (req, res) => {
  const { evenementId } = req.params;
  const { titreEvenement, dateEvenement, descriptionEvenement, placesDisponibles, statutEvenement } = req.body;

  Evenement.findByPk(evenementId)
    .then(evenement => {
      if (!evenement) {
        res.status(404).json({ message: 'Événement non trouvé.' });
        return;
      }
      evenement.titreEvenement = titreEvenement;
      evenement.dateEvenement = dateEvenement;
      evenement.descriptionEvenement = descriptionEvenement;
      evenement.placesDisponibles = placesDisponibles;
      evenement.statutEvenement = statutEvenement;

      return evenement.save();
    })
    .then(updatedEvenement => {
      res.status(200).json(updatedEvenement);
    })
    .catch(err => {
      res.status(500).json({ message: "Une erreur s'est produite lors de la mise à jour de l'événement." });
    });
};

// Supprimer un événement par ID
exports.delete = (req, res) => {
  const { evenementId } = req.params;

  Evenement.findByPk(evenementId)
    .then(evenement => {
      if (!evenement) {
        res.status(404).json({ message: 'Événement non trouvé.' });
        return;
      }
      return evenement.destroy();
    })
    .then(() => {
      res.status(204).send();
    })
    .catch(err => {
      res.status(500).json({ message: "Une erreur s'est produite lors de la suppression de l'événement." });
    });
};
