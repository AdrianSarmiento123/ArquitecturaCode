import React, { useEffect, useState } from 'react';
import axios from 'axios';

function EditarPerfil() {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    password: '',
    especialidad: ''
  });
  const [mensaje, setMensaje] = useState('');

  const storedUser = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (storedUser) {
      setFormData({
        nombre: storedUser.nombre || '',
        apellido: storedUser.apellido || '',
        correo: storedUser.correo || '',
        password: '',
        especialidad: storedUser.especialidad || ''
      });
    }
  }, [storedUser]);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`http://localhost:3001/usuarios/${storedUser.id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setMensaje('Perfil actualizado correctamente');
      localStorage.setItem('user', JSON.stringify(res.data));
    } catch (error) {
      console.error(error);
      setMensaje('Error al actualizar perfil');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Editar Perfil</h2>
      {mensaje && <p>{mensaje}</p>}
      <form onSubmit={handleSubmit}>
        <input name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Nombre"/>
        <input name="apellido" value={formData.apellido} onChange={handleChange} placeholder="Apellido"/>
        <input name="correo" value={formData.correo} onChange={handleChange} placeholder="Correo"/>
        <input name="password" value={formData.password} onChange={handleChange} placeholder="Nueva contraseña"/>
        <input name="especialidad" value={formData.especialidad} onChange={handleChange} placeholder="Especialidad"/>
        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
  );
}

export default EditarPerfil;
