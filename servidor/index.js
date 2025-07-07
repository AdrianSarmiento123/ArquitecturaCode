const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');

const db = require('./models');

app.use(express.json());
app.use(cors());

// Servir imágenes estáticas
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rutas
const usuariosRouter = require('./routes/usuarios');
app.use("/usuarios", usuariosRouter);

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Servidor corriendo en puerto 3001");
  });
});
