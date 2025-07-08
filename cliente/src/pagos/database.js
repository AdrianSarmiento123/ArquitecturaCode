const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('pagos_db', 'user', 'pass', {
  host: 'localhost',
  dialect: 'postgres',
});
const Pago = require('./entities/Pago')(sequelize, DataTypes);

module.exports = { sequelize, Pago };
