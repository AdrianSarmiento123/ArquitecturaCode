// src/pages/DashboardEntidad.jsx
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function DashboardEntidad() {
  const { id } = useParams();
  const navigate = useNavigate();

  const storedUser = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!storedUser) {
      navigate('/usuario/login');
    }
  }, [storedUser, navigate]);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Dashboard Entidad</h1>
      <p>ID en URL: {id}</p>
      <p>ID en localStorage: {storedUser?.id}</p>
      <p>Nombre: {storedUser?.nombre}</p>
      <p>Correo: {storedUser?.correo}</p>
      <p>Rol: {storedUser?.role}</p>
      <button onClick={() => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        navigate('/usuario/login');
      }}>
        Cerrar sesión
      </button>
    </div>
  );
}

export default DashboardEntidad;
