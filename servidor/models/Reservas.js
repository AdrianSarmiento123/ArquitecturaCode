module.exports = (sequelize, DataTypes) => {
  const Reservas = sequelize.define('reservas', {
    fecha: DataTypes.DATEONLY,
    horaInicio: DataTypes.TIME,
    horaFin: DataTypes.TIME,
    estado: DataTypes.ENUM('pendiente', 'aprobada', 'cancelada'),
  });

  Reservas.associate = models => {
    Reservas.belongsTo(models.canchas, { foreignKey: 'canchaId' });
    Reservas.belongsTo(models.usuarios, { foreignKey: 'usuarioId' });
    Reservas.hasOne(models.pagos, { foreignKey: 'reservaId' });
  };

  return Reservas;
};
