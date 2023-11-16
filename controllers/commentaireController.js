const db = require('../models');
const Commentaire = db.Commentaire;

// Créer un nouveau commentaire
exports.create = (req, res) => {
  const { utilisateurId, dateCommentaire, commentaire, evaluation, activiteAssociee } = req.body;

  Commentaire.create({
    utilisateurId,
    dateCommentaire,
    commentaire,
    evaluation,
    activiteAssociee
  })
    .then(commentaire => {
      res.status(201).json(commentaire);
    })
    .catch(err => {
      res.status(500).json({ message: "Une erreur s'est produite lors de la création du commentaire." });
    });
};

// Récupérer tous les commentaires
exports.findAll = (req, res) => {
  Commentaire.findAll()
    .then(commentaires => {
      res.status(200).json(commentaires);
    })
    .catch(err => {
      res.status(500).json({ message: "Une erreur s'est produite lors de la récupération des commentaires." });
    });
};

// Récupérer un seul commentaire par ID
exports.findOne = (req, res) => {
  const { commentaireId } = req.params;

  Commentaire.findByPk(commentaireId)
    .then(commentaire => {
      if (!commentaire) {
        res.status(404).json({ message: 'Commentaire non trouvé.' });
        return;
      }
      res.status(200).json(commentaire);
    })
    .catch(err => {
      res.status(500).json({ message: "Une erreur s'est produite lors de la récupération du commentaire." });
    });
};

// Mettre à jour un commentaire par ID
exports.update = (req, res) => {
  const { commentaireId } = req.params;
  const { dateCommentaire, commentaire, evaluation, activiteAssociee } = req.body;

  Commentaire.findByPk(commentaireId)
    .then(commentaire => {
      if (!commentaire) {
        res.status(404).json({ message: 'Commentaire non trouvé.' });
        return;
      }
      commentaire.dateCommentaire = dateCommentaire;
      commentaire.commentaire = commentaire;
      commentaire.evaluation = evaluation;
      commentaire.activiteAssociee = activiteAssociee;

      return commentaire.save();
    })
    .then(updatedCommentaire => {
      res.status(200).json(updatedCommentaire);
    })
    .catch(err => {
      res.status(500).json({ message: "Une erreur s'est produite lors de la mise à jour du commentaire." });
    });
};

// Supprimer un commentaire par ID
exports.delete = (req, res) => {
  const { commentaireId } = req.params;

  Commentaire.findByPk(commentaireId)
    .then(commentaire => {
      if (!commentaire) {
        res.status(404).json({ message: 'Commentaire non trouvé.' });
        return;
      }
      return commentaire.destroy();
    })
    .then(() => {
      res.status(204).send();
    })
    .catch(err => {
      res.status(500).json({ message: "Une erreur s'est produite lors de la suppression du commentaire." });
    });
};
