module.exports = (sequelize, DataType) => {
  const painting = sequelize.define('painting', {
    id_painting: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataType.STRING(50),
      allowNull: true,
    },
    descripcion: {
      type: DataType.STRING(300),
      allowNull: true,
    }
  }, {
    createdAt: 'fecha_creacion',
    updatedAt: 'fecha_modificacion',
  });

  painting.associate = (models) => {
    painting.belongsTo(models.artist, { as: 'artist', foreignKey: {name: 'fid_artist', allowNull: false}});
  }

  return painting;
};