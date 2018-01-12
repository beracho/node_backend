const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

// Iniciamos el servidor
const app = express();

// Iniciamos los modelos de sequelize
const db = require('./middleware/db');

// Sincronizamos la base de datos
db.sequelize.sync().then(() => {
  console.log("\n***Base de datos generada");
  const seed = require('./middleware/seed');
  console.log("\n***Cargando datos por defecto");
  seed(db);
}).done();

// Habilitamos los logs
app.use(morgan("dev"));

app.use(bodyParser("dev"));

// Middleware
app.use((req, res, next) => {
  console.log("***Procesando petición...\n");
  next();
});

app.get("/artistas", (req, res) => {
  listarArtistas()
  .then(respuesta => {
    res.setHeader('Content-Type', 'text/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json(respuesta);
    res.end("Consulta correcta");
  })
  .catch(error => {
    console.log(error);
    res.end("error")
  });
});

app.post("/artistas", (req, res) => {
  // console.log('----------------');
  // console.log(Object.keys(req));
  crearArtistas(req.body)
  .then(respuesta => {
    res.setHeader('Content-Type', 'text/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json(respuesta);
    res.end("Consulta correcta");
  })
  .catch(error => {
    console.log(error);
    res.end("error")
  });
});


// function crearPersona() {
//   const persona = {
//     nombres: 'JUAN',
//     apellidos: 'PEREZ PEREZ',
//     fecha_nacimiento: new Date(),
//   };

//   db.persona.create(persona)
//   .then(respuesta => {
//     console.log("\n***creando persona");
//     console.log(JSON.stringify(respuesta));
//   }).catch(error => console.log(error));
// }

// function crearPersonaYHobbie() {
//   const persona = {
//     nombres: 'Adrian Marcelo',
//     apellidos: 'Berazaín Mallea',
//     fecha_nacimiento: new Date(1991, 1, 1),
//   };

//   db.persona.create(persona)
//   .then(respuesta => {
//     console.log("\n***creando persona para hobbie");
//     console.log(JSON.stringify(respuesta));

//     const hobbie = {
//       descripcion: 'Pasear en  bicicleta',
//       fid_persona: respuesta.id_persona,
//     } 

//     return db.hobbie.create(hobbie);
//   }).then(respuesta => {
//     console.log("\n***creando hobbie");
//     console.log(JSON.stringify(respuesta));
//   }).catch(error => console.log(error));
// }


// function modificarPersona() {

//   db.persona.update({
//     nombres: 'MARIA ISABEL',
//   }, {
//     where: {
//       id_persona: 2,
//     },
//     // returning: true,
//   })
//   .then(respuesta => {
//     console.log("\n***modificando persona");
//     console.log(JSON.stringify(respuesta));
//   }).catch(error => console.log(error));

// }


// function modificarPersonaObjeto() {

//   db.persona.findById(2)
//   .then(respuesta => {
//     return respuesta.updateAttributes({ nombres: 'MARIA ISABLE' });
//   }).then(respuesta => {
//     console.log("\n***modificando persona");
//     console.log(JSON.stringify(respuesta));
//   }).catch(error => console.log(error));

// }


function listarArtistas() {
  return db.artist.findAll()
  .then(respuesta => {
    console.log("\n***Listando persona");
    return respuesta;
  }).catch(error => console.log(error));
}

function crearArtistas(body) {
  return db.artist.create({
    nombres: body.nombres,
    apellidos: body.apellidos,
    fecha_nacimiento: body.fecha_nacimiento
  })
    .then(respuesta => {
      console.log("\n***Listando persona");
      return respuesta;
    }).catch(error => console.log(error));
}

// function listarPersonasYHobbies() {

//   db.persona.findAll({
//     include: [{
//       model: db.hobbie,
//       as: 'hobbies',
//     }],
//   })
//   .then(respuesta => {
//     console.log("\n***Listando persona y hobbies");
//     console.log(JSON.stringify(respuesta));
//   }).catch(error => console.log(error));

// }

// function listarHobbies() {

//   db.hobbie.findAll({
//     include: [{
//       model: db.persona,
//       as: 'persona',
//     }],
//   })
//   .then(respuesta => {
//     console.log("\n***Listando hobbies");
//     console.log(JSON.stringify(respuesta));
//   }).catch(error => console.log(error));

// }


// function borrarHobbie() {

//   db.hobbie.destroy({
//     where: {id_hobbie: 2},
//   })
//   .then(respuesta => {
//     console.log("\n***Eliminando hobbie");
//     console.log(JSON.stringify(respuesta));
//   }).catch(error => console.log(error));

// }


app.listen(4000);