module.exports = (sequelize, DataType) => { 
  const artist = sequelize.define('artist', {
    id_artist: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombres: {
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
  artist.associate = (models) => {
    artist.hasMany(models.painting, { as: 'paintings', foreignKey: { name: 'fid_artist', allowNull: false } });
  };

  return artist;
};