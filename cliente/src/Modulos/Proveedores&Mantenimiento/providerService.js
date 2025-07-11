import axios from 'axios';

const API_URL = 'http://localhost:3001/proveedores'; // Cambiar si usas dominio distinto

const providerService = {
  // 🔧 RF3.1: Registrar nuevo proveedor
  registrarProveedor: (data) => axios.post(`${API_URL}/`, data),

  // 🛠 RF3.2: Crear una nueva solicitud de servicio
  crearSolicitud: (data) => axios.post(`${API_URL}/solicitudes`, data),

  // ⭐ RF3.3: Obtener proveedores recomendados por especialidad y calificación promedio
  obtenerRecomendaciones: (especialidad) =>
    axios.get(`${API_URL}/recomendaciones`, {
      params: { especialidad }
    }),

  // 🤝 RF3.4: Asignar un proveedor a una solicitud específica
  asignarProveedor: (solicitudId, proveedorId) =>
    axios.put(`${API_URL}/solicitudes/${solicitudId}/asignar`, {
      proveedorId
    }),

  // ✅ RF3.5: Confirmar o rechazar una solicitud (estado: 'asignado' | 'completado')
  confirmarSolicitud: (solicitudId, estado) =>
    axios.put(`${API_URL}/solicitudes/${solicitudId}/confirmar`, {
      estado
    }),

  // 📝 RF3.6: Calificar proveedor con puntuación y comentario
  calificarProveedor: (data) => axios.post(`${API_URL}/calificaciones`, data),

  // 📋 RF3.7: Obtener historial de mantenimiento de una cancha (incluye info del proveedor)
  obtenerHistorial: (canchaId) =>
    axios.get(`${API_URL}/historial/${canchaId}`),

  // 💬 RF3.8: Obtener comentarios y puntuaciones de un proveedor específico
  obtenerComentarios: (proveedorId) =>
    axios.get(`${API_URL}/${proveedorId}/comentarios`)
};

export default providerService;
