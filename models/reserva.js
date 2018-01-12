module.exports = (sequelize, DataType) => {
  const reserva = sequelize.define('reserva', {
    id_reserva: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fecha: {
      type: DataType.DATE,
      allowNull: true,
    },
    horas: {
      type: DataType.INTEGER,
      allowNull: true,
    }
  }, {
    createdAt: 'fecha_creacion',
    updatedAt: 'fecha_modificacion',
  });

  reserva.associate = (models) => {
    reserva.belongsTo(models.usuario, { as: 'usuario', foreignKey: {name: 'fid_usuario', allowNull: false}});
    reserva.belongsTo(models.sala, { as: 'sala', foreignKey: {name: 'fid_sala', allowNull: false}});
  }

  return reserva;
};