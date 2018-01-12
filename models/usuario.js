module.exports = (sequelize, DataType) => { 
  const usuario = sequelize.define('usuario', {
    id_usuario: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombres: {
      type: DataType.STRING(100), 
      allowNull: false,
    },
    usuario: {
      type: DataType.STRING(100), 
      allowNull: false,
    },
    apellidos: {
      type: DataType.STRING(100),
      allowNull: false,
    },
    fecha_nacimiento: {
      type: DataType.DATE,
      allowNull: false,
    },
  }, {
    createdAt: 'fecha_creacion',
    updatedAt: 'fecha_modificacion',
  });
  usuario.associate = (models) => {
    usuario.hasMany(models.reserva, { as: 'reservas', foreignKey: { name: 'fid_usuario', allowNull: false } });
  };

  return usuario;
};