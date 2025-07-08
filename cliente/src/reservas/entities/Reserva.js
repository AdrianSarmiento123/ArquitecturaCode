module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Reserva', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    usuarioId: { type: DataTypes.INTEGER, allowNull: false },
    canchaId: { type: DataTypes.INTEGER, allowNull: false },
    fecha: { type: DataTypes.DATEONLY, allowNull: false },
    hora: { type: DataTypes.STRING, allowNull: false }
  }, { tableName: 'reservas' });
};
