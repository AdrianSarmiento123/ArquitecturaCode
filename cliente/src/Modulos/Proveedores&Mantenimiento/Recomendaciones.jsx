import React, { useState } from 'react';
import providerService from './providerService';

const Recomendaciones = () => {
  const [especialidad, setEspecialidad] = useState('');
  const [proveedores, setProveedores] = useState([]);
  const [comentariosVisibles, setComentariosVisibles] = useState({});

  const buscar = async () => {
    try {
      const res = await providerService.obtenerRecomendaciones(especialidad);
      setProveedores(res.data || []);
      setComentariosVisibles({}); // Reiniciar comentarios al buscar
    } catch (error) {
      console.error(error);
      alert('❌ Error al obtener recomendaciones');
    }
  };

  const toggleComentarios = async (proveedorId) => {
    const yaVisibles = comentariosVisibles[proveedorId];

    if (yaVisibles) {
      // Ocultar
      setComentariosVisibles(prev => ({
        ...prev,
        [proveedorId]: null
      }));
    } else {
      // Cargar comentarios
      try {
        const res = await providerService.obtenerComentarios(proveedorId);
        setComentariosVisibles(prev => ({
          ...prev,
          [proveedorId]: res.data || []
        }));
      } catch (error) {
        console.error(error);
        alert('❌ Error al obtener comentarios');
      }
    }
  };

  return (
    <div>
      <input
        placeholder="Especialidad"
        value={especialidad}
        onChange={e => setEspecialidad(e.target.value)}
      />
      <button onClick={buscar}>Buscar</button>

      <ul>
        {proveedores.map(p => {
          const promedio = typeof p.calificacionPromedio === 'number'
            ? p.calificacionPromedio.toFixed(1)
            : 'N/A';

          return (
            <li key={p.id}>
              <strong>{p.nombre}</strong> - {p.especialidad} - ⭐ {promedio}
              <button onClick={() => toggleComentarios(p.id)}>
                {comentariosVisibles[p.id] ? 'Ocultar comentarios' : 'Ver comentarios'}
              </button>

              {comentariosVisibles[p.id] && (
                <ul>
                  {comentariosVisibles[p.id].length > 0 ? (
                    comentariosVisibles[p.id].map((c, index) => (
                      <li key={index}>📝 {c.comentario} - ⭐ {c.puntuacion}</li>
                    ))
                  ) : (
                    <li>No hay comentarios</li>
                  )}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Recomendaciones;
