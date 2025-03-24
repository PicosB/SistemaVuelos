const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const aeropuertoRouter = require('./routes/aeropuertoRouter');
const aerolineaRouter = require('./routes/aerolineaRouter');
const asientoRouter = require('./routes/asientoRouter');
const boletoRouter = require('./routes/boletoRouter');
const notificacionRouter = require('./routes/notificacionRouter');
const pagoRouter = require('./routes/pagoRouter');
const reservaRouter = require('./routes/reservaRouter');
const usuarioRouter = require('./routes/usuarioRouter');
const vueloRouter = require('./routes/vueloRouter');

const app = express();
app.use(cors());
app.use(bodyParser.json()); 

app.use('/api/aeropuertos', aeropuertoRouter);
app.use('/api/aerolineas', aerolineaRouter);
app.use('/api/asientos', asientoRouter);
app.use('/api/boletos', boletoRouter);
app.use('/api/notificaciones', notificacionRouter);
app.use('/api/pagos', pagoRouter);
app.use('/api/reservas', reservaRouter);
app.use('/api/usuarios', usuarioRouter);
app.use('/api/vuelos', vueloRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
