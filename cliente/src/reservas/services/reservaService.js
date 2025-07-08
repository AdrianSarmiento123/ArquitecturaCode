const reservaRepo = require('../repositories/reservaRepository');

exports.crearReserva = async ({ usuarioId, canchaId, fecha, hora }) => {
  const existente = await reservaRepo.buscarPorHorario(canchaId, fecha, hora);
  if (existente) throw new Error('Horario no disponible');
  return reservaRepo.crearReserva({ usuarioId, canchaId, fecha, hora });
};
