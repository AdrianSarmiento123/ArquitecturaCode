const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('reservas_db', 'user', 'pass', {
  host: 'localhost',
  dialect: 'postgres',
});
const Reserva = require('./entities/Reserva')(sequelize, DataTypes);

module.exports = { sequelize, Reserva };
