const express = require('express');
const app = express();
const reservaRoutes = require('./routes/reservaRoutes');
const { sequelize } = require('./database');

app.use(express.json());
app.use('/reserva', reservaRoutes);

sequelize.sync().then(() => {
  app.listen(3001, () => console.log('Servicio de Reservas corriendo en puerto 3001'));
});
