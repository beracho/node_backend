const artists = [
  { // 1
    nombres: 'Leonardo',
    apellidos: 'Da Vinci',
    fecha_nacimiento: new Date(1991, 1, 1),
    fecha_creacion: new Date(),
    fecha_modificacion: new Date(),
  }, { // 2
    nombres: 'Michelangelo',
    apellidos: 'di Lodovico Buonarroti Simoni',
    fecha_nacimiento: new Date(1991, 1, 1),
    fecha_creacion: new Date(),
    fecha_modificacion: new Date(),
  }];
//   const action = function (db) {
//     // return new Promise((resolve, reject) => {
//       return db.artist.bulkCreate(artists)
//       // .then(respuesta => {
//       //   resolve(respuesta);
//       // })
//       // .catch(err => reject(err))
//     // });
//     // return db.artist.bulkCreate(artists);
// }
module.exports = artists;