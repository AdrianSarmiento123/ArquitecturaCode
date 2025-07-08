const { Pago } = require('../database');

exports.realizarPago = async ({ reservaId, monto, metodo }) => {
  return Pago.create({ reservaId, monto, metodo });
};
