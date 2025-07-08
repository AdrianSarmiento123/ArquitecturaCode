const pagoService = require('../services/pagoService');

exports.realizarPago = async (req, res) => {
  try {
    const pago = await pagoService.realizarPago(req.body);
    res.status(201).json(pago);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
