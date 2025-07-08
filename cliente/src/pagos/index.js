const express = require('express');
const app = express();
const pagoRoutes = require('./routes/pagoRoutes');
const { sequelize } = require('./database');

app.use(express.json());
app.use('/pago', pagoRoutes);

sequelize.sync().then(() => {
  app.listen(3002, () => console.log('Servicio de Pagos corriendo en puerto 3002'));
});
