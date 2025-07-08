const reservaService = require('../services/reservaService');

exports.crearReserva = async (req, res) => {
  try {
    const reserva = await reservaService.crearReserva(req.body);
    res.status(201).json(reserva);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
