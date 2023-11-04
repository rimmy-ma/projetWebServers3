const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');
const Utilisateur = require('./Utilisateur'); // Importez le modèle de la table des utilisateurs si nécessaire

class Evenement extends Model {}

Evenement.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  titreEvenement: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dateEvenement: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  descriptionEvenement: {
    type: DataTypes.TEXT, // Utilisez TEXT pour la description de l'événement
    allowNull: false,
  },
  placesDisponibles: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  organisateurId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Utilisateur,
      key: 'id',
    },
  },
  statutEvenement: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Evenement',
  timestamps: false, // Si vous ne souhaitez pas utiliser les timestamps (created_at, updated_at)
});

module.exports = Evenement;