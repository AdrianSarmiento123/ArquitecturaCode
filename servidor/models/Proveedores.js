module.exports = (sequelize, DataTypes) => {
  const Proveedores = sequelize.define('proveedores', {
    nombre: DataTypes.STRING,
    especialidad: DataTypes.STRING,
    contacto: DataTypes.STRING,
  });

  Proveedores.associate = models => {
    Proveedores.hasMany(models.solicitudes, { foreignKey: 'proveedorId' });
  };

  return Proveedores;
};
