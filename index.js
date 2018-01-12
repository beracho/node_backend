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

//CRUD USUARIO
app.get("/usuarios", (req, res) => {
  console.log('------------------');
  console.log(JSON.stringify(req.query));
  listarUsuarios(req.query)
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

app.post("/usuario", (req, res) => {
  crearUsuario(req.body)
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

app.put("/usuario", (req, res) => {
  if (!req.body.id_usuario) {
    res.end("Se requiere el campo de id_usuario.")
  } else {
    modificarUsuario(req.body)
    .then(respuesta => {
      res.setHeader('Content-Type', 'text/json');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.json(respuesta);
      res.end("Consulta correcta");
    })
    .catch(error => res.end("error"));
  }
});

app.delete("/usuario", (req, res) => {
  borrarUsuario(req.body)
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

//CRUD SALA
app.get("/salas", (req, res) => {
  listarSalas()
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

app.post("/sala", (req, res) => {
  crearSala(req.body)
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

app.put("/sala", (req, res) => {
  editarSala(req.body)
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

app.delete("/sala", (req, res) => {
  borrarSala(req.body)
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



// FUNCTIONS USUARIO
function listarUsuarios() {
  return db.usuario.findAll()
  .then(respuesta => {
    console.log("\n***Listando persona");
    // console.log(respuesta);
    return respuesta;
  }).catch(error => console.log(error));
}

function crearUsuario(body) {
  return db.usuario.create({
    nombres: body.nombres,
    apellidos: body.apellidos,
    usuario: body.usuario,
    fecha_nacimiento: body.fecha_nacimiento
  })
    .then(respuesta => {
      console.log("\n***Listando persona");
      return respuesta;
    }).catch(error => console.log(error));
}

function modificarUsuario(body) {
  let params = {};
  if (body.nombres) {
    params.nombres = body.nombres;
  }
  if (body.apellidos) {
    params.apellidos = body.apellidos;
  }
  if (body.usuario) {
    params.usuario = body.usuario;
  }
  if (body.fecha_nacimiento) {
    params.fecha_nacimiento = body.fecha_nacimiento;
  }
  return db.usuario.update(params, {
    where: {
      id_usuario: body.id_usuario,
    },
  })
  .then(respuesta => {
    console.log("\n***modificando usuario");
    console.log(JSON.stringify(respuesta));
    return respuesta;
  }).catch(error => console.log(error));
}

function borrarUsuario(body) {
  return db.usuario.destroy({
    where: {id_usuario: body.id_usuario},
  })
  .then(respuesta => {
    console.log("\n***Eliminando usuario");
    console.log(JSON.stringify(respuesta));
    return respuesta;
  }).catch(error => console.log(error));
}

// FUNCTIONS SALA
function listarSalas() {
  return db.sala.findAll()
  .then(respuesta => {
    console.log("\n***Listando persona");
    return respuesta;
  }).catch(error => console.log(error));
}

function crearSala(body) {
  return db.sala.create({
    nombre: body.nombre,
    numero: body.numero
  })
    .then(respuesta => {
      console.log("\n***Listando persona");
      return respuesta;
    }).catch(error => console.log(error));
}

function modificarSala(body) {
  return db.sala.update({
    nombre: body.nombre,
    numero: body.numero
  }, {
    where: {
      id_sala: body.id_sala,
    },
  })
  .then(respuesta => {
    console.log("\n***modificando sala");
    console.log(JSON.stringify(respuesta));
    return respuesta;
  }).catch(error => console.log(error));
}

function borrarSala(body) {
  return db.sala.destroy({
    where: {id_sala: body.id_sala},
  })
  .then(respuesta => {
    console.log("\n***Eliminando sala");
    console.log(JSON.stringify(respuesta));
    return respuesta;
  }).catch(error => console.log(error));
}


app.listen(4000);