const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');
const Utilisateur = require('./Utilisateur'); //import de la table d'utilisateurs

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
    type: DataTypes.TEXT, //en format de texte
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
  timestamps: false, 
});

module.exports = Evenement;