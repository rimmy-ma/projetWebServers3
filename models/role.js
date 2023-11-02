// models/Role.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config');

const Role = sequelize.define('Role', {
  nom: DataTypes.STRING,
});

module.exports = Role;