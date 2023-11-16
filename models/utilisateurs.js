const { DataTypes } = require('sequelize');
const sequelize = require('../config');
const Role = require('./Role'); // Importez le modèle Role pour établir une association

const Utilisateur = sequelize.define('Utilisateur', {
  nom: DataTypes.STRING,
  prenom: DataTypes.STRING,
  naissance: DataTypes.DATE,
  photo: DataTypes.STRING,
  telephone: DataTypes.STRING,
  email: DataTypes.STRING,
  mot_de_passe: DataTypes.STRING,
});

// Associez le modèle Utilisateur avec le modèle Role s'il y a une relation.
Utilisateur.belongsTo(Role, { foreignKey: 'roleId' });

module.exports = Utilisateur;
