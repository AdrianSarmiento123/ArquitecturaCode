const API_URL = 'http://localhost:3001/usuarios';

const usuarioService = {
  getToken() {
    return localStorage.getItem('token');
  },

  getHeaders(json = true) {
    const token = this.getToken();
    return {
      ...(json && { 'Content-Type': 'application/json' }),
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  },

  async handleResponse(res, defaultMessage) {
    if (!res.ok) {
      const error = await res.json().catch(() => ({ message: defaultMessage }));
      throw new Error(error.message || defaultMessage);
    }
    return res.json();
  },

  // ✅ Obtener perfil
  async obtenerPerfil() {
    const res = await fetch(`${API_URL}/me`, {
      headers: this.getHeaders(),
    });
    return this.handleResponse(res, 'Error al obtener perfil.');
  },

  // ✅ Actualizar perfil
  async actualizarPerfil(data) {
    const res = await fetch(`${API_URL}/me`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });
    return this.handleResponse(res, 'Error al actualizar perfil.');
  },

  // ✅ Subir avatar
  async subirAvatar(file) {
    const formData = new FormData();
    formData.append('avatar', file);

    const res = await fetch(`${API_URL}/me/avatar`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.getToken()}`,
      },
      body: formData,
    });
    return this.handleResponse(res, 'Error al subir avatar.');
  },

  // ✅ Obtener historial con fallback
  async obtenerHistorial() {
    const res = await fetch(`${API_URL}/me/history`, {
      headers: this.getHeaders(),
    });
    return this.handleResponse(res, 'Error al obtener historial.');
  },
};

export default usuarioService;
