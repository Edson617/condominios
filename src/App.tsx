import { useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import './DropdownMenu.css'; // Importar el CSS del menú desplegable
import deparImage from './assets/condominioNO.png'; // Importar la imagen correctamente

function HomePage() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="home-container">
      {/* Menú desplegable */}
      <div className="dropdown-menu">
        <button className="menu-button" onClick={toggleMenu}>
          ≡ Menú
        </button>
        {isOpen && (
          <div className="menu-content">
            <Link to="/" className="menu-item">Inicio</Link>
            <Link to="/login" className="menu-item">Iniciar sesión</Link>
            <Link to="/register" className="menu-item">Registrar usuario</Link>
            <Link to="/PaymentForm" className="menu-item">Registrar pago</Link>
            <Link to="/FinesForm" className="menu-item">Registrar multas</Link>
            <Link to="/GatePermissionForm" className="menu-item">Permiso de portones</Link>
          </div>
        )}
      </div>

      {/* Sección de Bienvenida */}
      <div className="welcome-section">
        <h1>Bienvenido</h1>
        <p>Accede a todo lo que necesitas para gestionar tus condominios.</p>
        
        {/* Botón de acceso */}
        <Link to="/login">
          <button className="access-button">Acceder al Login</button>
        </Link>
      </div>

      {/* Sección de la imagen */}
      <div className="image-section">
        <img src={deparImage} alt="Departamento" />
      </div>
    </div>
  );
}

export default HomePage;
