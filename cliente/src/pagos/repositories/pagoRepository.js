const { Pago } = require('../database');

exports.crearPago = async (pagoData) => {
  return Pago.create(pagoData);
};

exports.listarPagos = async () => {
  return Pago.findAll();
};

exports.obtenerPagoPorId = async (id) => {
  return Pago.findByPk(id);
};
