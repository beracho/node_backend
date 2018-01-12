// Importando sequelize
// const Sequelize = require("sequelize");

// Librerías
const fs = require('fs');
const path = require('path');
const Q = require('q');

const directorioSedders = __dirname + '/../seeders';
const seed = function cargarDatos(db) {
  var promise_chain = Q.fcall(function(){});
  // Leyendo todos los archivos en el directorio models
  fs.readdirSync(directorioSedders)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    file = file.substring(0, file.length - 3)
    const seeder = require(__dirname + '/../seeders/'+file);
    file = file.substring(2)
    var promise_link = function() {
      var deferred = Q.defer();
      db[file].bulkCreate(seeder)
      .then(result => deferred.resolve(result))
      return deferred.promise;
    }
    promise_chain = promise_chain.then(promise_link);
  });
  promise_chain = promise_chain.then(resp => {
    console.log("\n**** Datos por defecto cargados a la base de datos exitosamente\n");
  }).catch(err => console.log(err));
}
module.exports = seed;