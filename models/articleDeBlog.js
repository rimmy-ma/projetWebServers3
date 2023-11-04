const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');
const Utilisateur = require('./Utilisateur'); // Importez le modèle de la table des utilisateurs si nécessaire

class Article extends Model {}

Article.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  titreArticle: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contenuArticle: {
    type: DataTypes.TEXT, // Utilisez TEXT pour le contenu de l'article
    allowNull: false,
  },
  datePublication: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  auteurId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Utilisateur,
      key: 'id',
    },
  },
}, {
  sequelize,
  modelName: 'Article',
  timestamps: false, // Si vous ne souhaitez pas utiliser les timestamps (created_at, updated_at)
});

module.exports = Article;