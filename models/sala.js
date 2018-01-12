module.exports = (sequelize, DataType) => { 
  const sala = sequelize.define('sala', {
    id_sala: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataType.STRING(100), 
      allowNull: false,
    },
    numero: {
      type: DataType.INTEGER,
      allowNull: false,
    }
  }, {
    createdAt: 'fecha_creacion',
    updatedAt: 'fecha_modificacion',
  });
  sala.associate = (models) => {
    sala.hasMany(models.reserva, { as: 'reservas', foreignKey: { name: 'fid_sala', allowNull: false } });
  };

  return sala;
};