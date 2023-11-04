const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class Reservation extends Model {}

Reservation.init({
  // Définir les champs de la table Réservations
  utilisateurId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  dateReservation: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  activiteReservee: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nombreParticipants: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  statutReservation: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Reservation',
  timestamps: false, // Si vous ne souhaitez pas utiliser les timestamps (created_at, updated_at)
});

module.exports = Reservation;