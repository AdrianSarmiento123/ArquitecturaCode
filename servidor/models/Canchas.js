module.exports = (sequelize, DataTypes) => {
  const Canchas = sequelize.define('canchas', {
    nombre: DataTypes.STRING,
    tipo: DataTypes.STRING,
    estado: DataTypes.ENUM('disponible', 'no disponible'),
    imagen: DataTypes.STRING, // Aquí puedes guardar la URL o el nombre del archivo
  });

  Canchas.associate = models => {
    Canchas.belongsTo(models.polideportivos, { foreignKey: 'polideportivoId' });
    Canchas.hasMany(models.reservas, { foreignKey: 'canchaId' });
  };

  return Canchas;
};
