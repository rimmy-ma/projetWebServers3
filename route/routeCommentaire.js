// routes/commentaires.js
const express = require('express');
const router = express.Router();
const CommentaireController = require('../controllers/commentaireController');

// Créer un nouveau commentaire
router.post('/commentaires', CommentaireController.createCommentaire);

// Récupérer tous les commentaires
router.get('/commentaires', CommentaireController.getAllCommentaires);

// Récupérer un commentaire par ID
router.get('/commentaires/:id', CommentaireController.getCommentaireById);

// Mettre à jour un commentaire
router.put('/commentaires/:id', CommentaireController.updateCommentaire);

// Supprimer un commentaire
router.delete('/commentaires/:id', CommentaireController.deleteCommentaire);

module.exports = router;