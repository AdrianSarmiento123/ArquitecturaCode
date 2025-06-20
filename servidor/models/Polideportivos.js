module.exports = (sequelize, DataTypes) => {
  const Polideportivos = sequelize.define('polideportivos', {
    nombre: DataTypes.STRING,
    ubicacion: DataTypes.STRING,
    tipo: DataTypes.STRING,
    precio: DataTypes.FLOAT,
    techado: DataTypes.BOOLEAN,
    iluminacion: DataTypes.BOOLEAN,
  });

  Polideportivos.associate = models => {
    Polideportivos.hasMany(models.canchas, { foreignKey: 'polideportivoId' });
  };

  return Polideportivos;
};
