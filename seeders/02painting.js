const paintings = [
  { // 1
    nombre: 'Monalisa',
    descripcion: 'Pintura de una mujer sentada',
    fecha_creacion: new Date(),
    fecha_modificacion: new Date(),
    fid_artist: 1
  }, { // 2
    nombre: 'The last judgement',
    descripcion: 'Ángeles volando en el dia del juicio final',
    fecha_creacion: new Date(),
    fecha_modificacion: new Date(),
    fid_artist: 2
  }, { // 3
    nombre: 'Capilla sixtina',
    descripcion: 'Pintura del techo de la Capilla Sixtina, basada en muchos ángeles',
    fecha_creacion: new Date(),
    fecha_modificacion: new Date(),
    fid_artist: 2
  }];
// const action = function cargar(db) {
//   return new Promise((resolve, reject) => {
//     db.painting.bulkCreate(paintings)
//     .then(respuesta => {
//       resolve(respuesta);
//     })
//     .catch(err => reject(err))
//   });
// }
module.exports = paintings;