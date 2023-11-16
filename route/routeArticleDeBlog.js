import express from 'express';
import { getAllArticles, getArticleById, createArticle, updateArticle, deleteArticle } from '../controllers/articleDeBlogController.js';

// routes/articles.js
const express = require('express');
const router = express.Router();
const ArticleController = require('../controllers/articleDeBlogController');

// Créer un nouvel article de blog
router.post('/articles', ArticleController.createArticle);

// Récupérer tous les articles de blog
router.get('/articles', ArticleController.getAllArticles);

// Récupérer un article de blog par ID
router.get('/articles/:id', ArticleController.getArticleById);

// Mettre à jour un article de blog
router.put('/articles/:id', ArticleController.updateArticle);

// Supprimer un article de blog
router.delete('/articles/:id', ArticleController.deleteArticle);

module.exports = router;

export default router;