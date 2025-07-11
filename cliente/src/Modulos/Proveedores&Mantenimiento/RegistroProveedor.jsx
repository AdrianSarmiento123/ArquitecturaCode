import React, { useState } from 'react';
import providerService from './providerService';

const RegistroProveedor = () => {
  const [form, setForm] = useState({
    nombre: '',
    especialidad: '',
    correo: '',
    telefono: ''
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await providerService.registrarProveedor(form);
      alert('✅ Proveedor registrado con éxito');
      setForm({ nombre: '', especialidad: '', correo: '', telefono: '' });
    } catch (error) {
      alert(`❌ Error: ${error.response?.data?.error || error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="nombre"
        placeholder="Nombre"
        value={form.nombre}
        onChange={handleChange}
        required
      />
      <input
        name="especialidad"
        placeholder="Especialidad"
        value={form.especialidad}
        onChange={handleChange}
        required
      />
      <input
        name="correo"
        type="email"
        placeholder="Correo electrónico"
        value={form.correo}
        onChange={handleChange}
        required
      />
      <input
        name="telefono"
        placeholder="Teléfono"
        value={form.telefono}
        onChange={handleChange}
        required
      />
      <button type="submit">Registrar</button>
    </form>
  );
};

export default RegistroProveedor;
