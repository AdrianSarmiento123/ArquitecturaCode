// App.jsx
import './App.css';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './PaginasUsuario/LandingPage';
import ConfirmationPage from './pages/PaginaConfirmación/ConfirmationPage';
import RegisterPageCliente from './pages/PaginaRegistroUsuario/RegisterPage2';
import RegisterPageFreelancer from './pages/PaginaRegistroEntidad/RegisterPage';
import LoginPage1 from './pages/Login/LoginPage1';
import Pie from './ComponentesGeneral/footer'; 
import Header from './ComponentesGeneral/header';
import DashboardUsuario from './Modulos/GestionUsuarios/DashboardUsuario';
import DashboardEntidad from './Modulos/GestionUsuarios/DashboardEntidad';
import EditarPerfil from './Modulos/GestionUsuarios/EditarPerfil';
import HistorialReservas from './Modulos/GestionUsuarios/HistorialReservas';
import WizardRecuperacion from '../src/Modulos/GestionUsuarios/RecuperarCuenta/WizardRecuperacion';
import PanelProveedores from './Modulos/Proveedores&Mantenimiento/PanelProveedores';


function App() {
  return (
    <div className="App"> 
      <Header />
      <main>
        <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/register/usuario" element={<RegisterPageCliente />} />
              <Route path="/register/entidad" element={<RegisterPageFreelancer />} />
              <Route path="/confirmation" element={<ConfirmationPage />} />
              <Route path="/usuario/login" element={<LoginPage1 />} />
              <Route path="/dashboard/usuario/:id" element={<DashboardUsuario />} />
              <Route path="/dashboard/entidad/:id" element={<DashboardEntidad />} />
              <Route path="/editar-perfil/:id" element={<EditarPerfil />} />
              <Route path="/historial/:id" element={<HistorialReservas />} />
              <Route path="/recuperar-password" element={<WizardRecuperacion />} />
              <Route path="/proveedores/panel" element={<PanelProveedores />} />

          </Routes>
      </main>
      <Pie /> 
    </div>
  );
}

export default App;



