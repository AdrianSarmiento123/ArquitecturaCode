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
        </Routes>
      </main>
      <Pie /> 
    </div>
  );
}

export default App;



