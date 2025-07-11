module.exports = (sequelize, DataTypes) => {
  const SolicitudesServicio = sequelize.define("solicitudesServicio", {
    canchaId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    estado: {
      type: DataTypes.ENUM("pendiente", "aceptado", "rechazado"),
      defaultValue: "pendiente"
    }
  }, {
    tableName: "solicitudesServicio"
  });

  SolicitudesServicio.associate = (models) => {
    SolicitudesServicio.hasMany(models.historialMantenimiento, {
      foreignKey: "solicitudId",
      as: "mantenimientos"
    });
  };

  return SolicitudesServicio;
};
