const express = require('express');
const router = express.Router();
const { Sequelize } = require('sequelize');
const {
  proveedores,
  solicitudesServicio,
  calificacionesProveedor,
  historialMantenimiento
} = require('../models');

// RF3.1: Registro de Proveedores
router.post('/', async (req, res) => {
  try {
    const nuevoProveedor = await proveedores.create(req.body);
    res.status(201).json(nuevoProveedor);
  } catch (error) {
    console.error('Error al registrar proveedor:', error);
    res.status(500).json({ error: 'Error al registrar proveedor' });
  }
});

// RF3.2: Crear Solicitud de Servicio
router.post('/solicitudes', async (req, res) => {
  try {
    const solicitud = await solicitudesServicio.create(req.body);
    res.status(201).json(solicitud);
  } catch (error) {
    console.error('Error al crear solicitud:', error);
    res.status(500).json({ error: 'Error al crear solicitud' });
  }
});

// RF3.3: Recomendación de Proveedores con promedio de calificación
router.get('/recomendaciones', async (req, res) => {
  const { especialidad } = req.query;

  try {
    const recomendados = await proveedores.findAll({
      where: { especialidad },
      attributes: [
        'id',
        'nombre',
        'especialidad',
        'correo',
        'telefono',
        [Sequelize.fn('COALESCE', Sequelize.fn('AVG', Sequelize.col('calificaciones.puntuacion')), 0), 'calificacionPromedio']
      ],
      include: [
        {
          model: calificacionesProveedor,
          as: 'calificaciones',
          attributes: []
        }
      ],
      group: ['proveedores.id'],
      order: [[Sequelize.literal('"calificacionPromedio"'), 'DESC']]
    });

    const resultado = recomendados.map(p => ({
      ...p.toJSON(),
      calificacionPromedio: parseFloat(p.get('calificacionPromedio'))
    }));

    res.json(resultado);
  } catch (error) {
    console.error('Error al obtener recomendaciones:', error);
    res.status(500).json({ error: 'Error al obtener recomendaciones' });
  }
});

// ✅ RF3.4: Asignar proveedor a solicitud y registrar en historial
router.put('/solicitudes/:id/asignar', async (req, res) => {
  const { id } = req.params;
  const { proveedorId } = req.body;

  try {
    const solicitud = await solicitudesServicio.findByPk(id);
    if (!solicitud) return res.status(404).json({ error: 'Solicitud no encontrada' });

    solicitud.proveedorId = proveedorId;
    solicitud.estado = 'asignado';
    await solicitud.save();

    await historialMantenimiento.create({
      solicitudId: solicitud.id,
      proveedorId,
      fecha: new Date(),
      detalle: `Proveedor #${proveedorId} asignado a solicitud #${solicitud.id}`
    });

    res.json(solicitud);
  } catch (error) {
    console.error('Error al asignar proveedor:', error);
    res.status(500).json({ error: 'Error al asignar proveedor' });
  }
});

// RF3.5: Confirmar o rechazar solicitud
router.put('/solicitudes/:id/confirmar', async (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;

  try {
    const solicitud = await solicitudesServicio.findByPk(id);
    if (!solicitud) return res.status(404).json({ error: 'Solicitud no encontrada' });

    solicitud.estado = estado;
    await solicitud.save();

    res.json(solicitud);
  } catch (error) {
    console.error('Error al confirmar/rechazar solicitud:', error);
    res.status(500).json({ error: 'Error al confirmar/rechazar solicitud' });
  }
});

// RF3.6: Calificar proveedor
router.post('/calificaciones', async (req, res) => {
  try {
    const calificacion = await calificacionesProveedor.create(req.body);
    res.status(201).json(calificacion);
  } catch (error) {
    console.error('Error al registrar calificación:', error);
    res.status(500).json({ error: 'Error al registrar calificación' });
  }
});

// RF3.7: Ver historial de mantenimiento por cancha
router.get('/historial/:canchaId', async (req, res) => {
  const { canchaId } = req.params;

  try {
    const historial = await historialMantenimiento.findAll({
      include: [
        {
          model: solicitudesServicio,
          as: 'solicitud',
          where: { canchaId },
          attributes: []
        },
        {
          model: proveedores,
          as: 'proveedor',
          attributes: ['id', 'nombre', 'especialidad']
        }
      ],
      order: [['fecha', 'DESC']]
    });

    res.json(historial);
  } catch (error) {
    console.error('Error al obtener historial:', error);
    res.status(500).json({ error: 'Error al obtener historial de mantenimiento' });
  }
});

// RF3.8: Obtener comentarios de un proveedor
router.get('/:proveedorId/comentarios', async (req, res) => {
  try {
    const { proveedorId } = req.params;
    const comentarios = await calificacionesProveedor.findAll({
      where: { proveedorId },
      attributes: ['puntuacion', 'comentario'],
      order: [['createdAt', 'DESC']]
    });

    res.json(comentarios);
  } catch (error) {
    console.error('Error al obtener comentarios:', error);
    res.status(500).json({ error: 'Error al obtener comentarios' });
  }
});

module.exports = router;
