module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Pago', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    reservaId: { type: DataTypes.INTEGER, allowNull: false },
    monto: { type: DataTypes.FLOAT, allowNull: false },
    metodo: { type: DataTypes.STRING, allowNull: false },
    fechaPago: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  }, { tableName: 'pagos' });
};
