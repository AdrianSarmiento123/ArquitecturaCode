module.exports = (sequelize, DataTypes) => {
  const Pagos = sequelize.define('pagos', {
    metodoPago: DataTypes.ENUM('yape', 'plin', 'tarjeta'),
    monto: DataTypes.FLOAT,
    estado: DataTypes.ENUM('exitoso', 'fallido', 'reembolsado'),
    comprobante: DataTypes.STRING,
  });

  Pagos.associate = models => {
    Pagos.belongsTo(models.reservas, { foreignKey: 'reservaId' });
  };

  return Pagos;
};
