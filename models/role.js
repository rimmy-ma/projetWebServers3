const { DataTypes } = require('sequelize');
const sequelize = require('../config');
const Utilisateur = require('./Utilisateur'); //import de l'utilisateur

const Role = sequelize.define('Role', {
  nom: {
    type: DataTypes.STRING,
    allowNull: false, //nom doit etre requis
  },
});

// associations
Role.hasMany(Utilisateur, {
  foreignKey: 'roleId', // roleId sera la cle etrangere
  onDelete: 'CASCADE', // Suppression
});

module.exports = Role;
