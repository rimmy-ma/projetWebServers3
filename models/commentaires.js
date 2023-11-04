const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class Commentaire extends Model {}

Commentaire.init({
  // Définir les champs de la table Commentaires
  utilisateurId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  dateCommentaire: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  commentaire: {
    type: DataTypes.STRING, // Ou tout autre type de données approprié
    allowNull: false,
  },
  evaluation: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  activiteAssociee: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Commentaire',
  timestamps: false, // Si vous ne souhaitez pas utiliser les timestamps (created_at, updated_at)
});

module.exports = Commentaire;