const { Reserva } = require('../database');

exports.buscarPorHorario = async (canchaId, fecha, hora) => {
  return Reserva.findOne({ where: { canchaId, fecha, hora } });
};

exports.crearReserva = async (reservaData) => {
  return Reserva.create(reservaData);
};

exports.listarReservas = async () => {
  return Reserva.findAll();
};

exports.eliminarReserva = async (id) => {
  return Reserva.destroy({ where: { id } });
};

exports.obtenerReservaPorId = async (id) => {
  return Reserva.findByPk(id);
};